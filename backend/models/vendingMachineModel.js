import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    product_id: { type: String, required: true, uppercase: true, trim: true },
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

const vendingMachineSchema = new mongoose.Schema({
    machine_id: { type: String, required: true, unique: true, uppercase: true, trim: true },
    location: { type: String, required: true },
    products: [productSchema]
});

const VendingMachine = mongoose.model('VendingMachine', vendingMachineSchema);

export default VendingMachine;
