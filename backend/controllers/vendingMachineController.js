import VendingMachine from '../models/vendingMachineModel.js';
import QRCode from "qrcode";
import { v2 as cloudinary } from "cloudinary";

// Create a new vending machine
export const createVendingMachine = async (req, res) => {
    const { machine_id, location, products } = req.body;

    try {
        // Check for unique machine_id
        const existingMachine = await VendingMachine.findOne({ machine_id });
        if (existingMachine) {
            return res.status(400).json({ message: "Machine ID already exists" });
        }

        // Generate QR Code (base64 PNG)
        const qrCodeDataUrl = await QRCode.toDataURL(machine_id);

        // Convert base64 → buffer
        const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        // Upload to Cloudinary
        const imageUpload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "image", folder: "vending-machines" }, // folder in the cloudinary
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(buffer);
        });

        // Create new vending machine with QR code URL
        const newMachine = new VendingMachine({
            machine_id,
            location,
            products,
            qr_code: imageUpload.secure_url, // save cloudinary QR code url
        });

        // Save in DB
        await newMachine.save();

        res.status(201).json(newMachine);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating vending machine", error });
    }
};


// Get all vending machines
export const getAllVendingMachines = async (req, res) => {
    try {
        const machines = await VendingMachine.find();
        res.status(200).json(machines);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vending machines", error });
    }
};

// Get a single vending machine by ID
export const getVendingMachineById = async (req, res) => {
    const { machine_id } = req.params;

    try {
        const machine = await VendingMachine.findOne({ machine_id });
        if (!machine) {
            return res.status(404).json({ message: "Vending machine not found" });
        }
        res.status(200).json(machine);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vending machine", error });
    }
};

// Update a vending machine and its products
export const updateVendingMachine = async (req, res) => {
    const { machine_id } = req.params;
    const { location, products } = req.body;

    try {
        // Find the vending machine by machine_id
        const machine = await VendingMachine.findOne({ machine_id });
        if (!machine) {
            return res.status(404).json({ message: "Vending machine not found" });
        }

        // Update location if provided
        if (location !== undefined) {
            machine.location = location;
        }

        // Update products if provided
        if (products && Array.isArray(products)) {
            products.forEach(updateProduct => {
                const product = machine.products.find(p => p.product_id === updateProduct.product_id);
                if (product) {
                    // Update existing product
                    if (updateProduct.product_name !== undefined) product.product_name = updateProduct.product_name;
                    if (updateProduct.price !== undefined) product.price = updateProduct.price;
                    if (updateProduct.stock !== undefined) product.stock = updateProduct.stock;
                } else {
                    // If product_id not found → add as new product
                    machine.products.push(updateProduct);
                }
            });
        }

        await machine.save();
        res.status(200).json({ message: "Vending machine updated successfully", machine });

    } catch (error) {
        res.status(500).json({ message: "Error updating vending machine", error: error.message });
    }
};

// Delete a vending machine
export const deleteVendingMachine = async (req, res) => {
    const { machine_id } = req.params;

    try {
        const deletedMachine = await VendingMachine.findOneAndDelete({ machine_id });
        if (!deletedMachine) {
            return res.status(404).json({ message: "Vending machine not found" });
        }
        res.status(200).json({ message: "Vending machine deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting vending machine", error });
    }
};

// Get all products from a vending machine
export const getAllProductsFromMachine = async (req, res) => {
    const { machine_id } = req.params;

    try {
        const machine = await VendingMachine.findOne({ machine_id });
        if (!machine) {
            return res.status(404).json({ message: "Vending machine not found" });
        }
        res.status(200).json(machine.products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products from vending machine", error });
    }
};

// Add a product to a vending machine
export const addProductToMachine = async (req, res) => {
    const { machine_id } = req.params;
    const product = req.body;

    try {
        // Check for duplicate product_id in the machine
        const machine = await VendingMachine.findOne({ machine_id });
        if (!machine) {
            return res.status(404).json({ message: "Vending machine not found" });
        }
        const exists = machine.products.some(p => p.product_id === product.product_id);
        if (exists) {
            return res.status(400).json({ message: "Product with this product_id already exists in the vending machine" });
        }
        machine.products.push(product);
        await machine.save();
        res.status(200).json(machine);
    } catch (error) {
        res.status(500).json({ message: "Error adding product to vending machine", error });
    }
};

// Delete a specific product from a vending machine
export const deleteProductFromMachine = async (req, res) => {
    let { machine_id, product_id } = req.params;

    // Normalize both
    machine_id = machine_id.trim().toUpperCase();
    product_id = product_id.trim().toUpperCase();

    try {
        const machine = await VendingMachine.findOne({ machine_id });
        if (!machine) {
            return res.status(404).json({ message: "Vending machine not found" });
        }

        // Find index by normalized product_id
        const index = machine.products.findIndex(
            p => p.product_id.toUpperCase() === product_id
        );

        if (index === -1) {
            return res.status(404).json({ message: "Product not found in vending machine" });
        }

        machine.products.splice(index, 1);
        await machine.save();

        res.status(200).json({ message: "Product deleted successfully", machine });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product from vending machine", error });
    }
};
