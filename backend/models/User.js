import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const userModel = mongoose.model('User', userSchema);
export default userModel;