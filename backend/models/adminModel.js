import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    admin_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
