import dotenv from 'dotenv';
dotenv.config();
// console.log('JWT_SECRET from env:', process.env.JWT_SECRET);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profileRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

import { connectCloudinary } from './utils/cloudinary.js'; 



const app = express();
// console.log(process.env.CLOUDINARY_API_KEY)
console.log
connectCloudinary()
app.use(cors({
  origin: 'http://localhost:5173', // allow your frontend
  credentials: true               // allow cookies/auth headers if needed
}));

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello")
})
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/bookmark', bookmarkRoutes);
app.use('/api/search', searchRoutes);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log('Server running on port 5000')))
  .catch(err => console.error(err));