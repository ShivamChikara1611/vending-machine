import express from "express";
import {
    createVendingMachine,
    getAllVendingMachines,
    getVendingMachineById,
    updateVendingMachine,
    deleteVendingMachine,
    addProductToMachine,
    deleteProductFromMachine,
    getAllProductsFromMachine
} from "../controllers/vendingMachineController.js";

const router = express.Router();

// Vending machine routes
router.post("/vending-machines", createVendingMachine);
router.get("/vending-machines", getAllVendingMachines);
router.get("/vending-machines/:machine_id", getVendingMachineById);
router.put("/vending-machines/:machine_id", updateVendingMachine);
router.delete("/vending-machines/:machine_id", deleteVendingMachine);

// Product routes for vending machines
router.get("/vending-machines/:machine_id/products", getAllProductsFromMachine);
router.post("/vending-machines/:machine_id/products", addProductToMachine);
router.delete("/vending-machines/:machine_id/products/:product_id", deleteProductFromMachine);

export default router;

