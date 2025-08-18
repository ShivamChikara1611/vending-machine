import Transaction from "../models/transactionModel.js";
import VendingMachine from "../models/vendingMachineModel.js";

// Handle checkout (create transaction + update stock)
export const createTransaction = async (req, res) => {
    try {
        const { machine_id, products, total_amount, payment_status, location } = req.body;

        // Update stock for each purchased product
        for (const product of products) {
            const vendingMachine = await VendingMachine.findOne({ machine_id });

            if (!vendingMachine) {
                return res.status(404).json({ message: "Vending Machine not found" });
            }

            const productInMachine = vendingMachine.products.find(
                (p) => p.product_id === product.product_id
            );

            if (!productInMachine) {
                return res.status(404).json({ message: `Product ${product.product_id} not found` });
            }

            if (productInMachine.stock < product.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.product_name}` });
            }

            productInMachine.stock -= product.quantity; // reduce stock
            await vendingMachine.save();

            // Save each transaction entry
            const transaction = new Transaction({
                product_id: product.product_id,
                product_name: product.product_name,
                machine_id,
                location,
                total_amount: product.price * product.quantity,
                payment_status,
            });

            await transaction.save();
        }

        res.status(201).json({ message: "Transaction completed successfully" });
    } catch (error) {
        console.error("Transaction Error:", error);
        res.status(500).json({ message: "Error creating transaction" });
    }
};
