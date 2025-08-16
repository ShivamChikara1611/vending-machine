import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    product_id: { type: String, required: true },
    product_name: { type: String, required: true },
    machine_id: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now },
    total_amount: { type: Number, required: true },
    payment_status: { type: String, enum: ['completed', 'failed'], required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
