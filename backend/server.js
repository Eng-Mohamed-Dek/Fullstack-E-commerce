import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import adminRoute from './routes/adminRoute.js'
import productRoute from './routes/productRoute.js'
import authRoutes from './routes/auth.js'
import cartRoutes from './routes/cartRoute.js'
import mongoose from 'mongoose';

// DNS error 
import { setServers } from "dns/promises";
import multer from 'multer';
setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(express.json())
app.use(cors())

const port = process.env.PORT;

app.use("/api", adminRoute)
app.use("/api", productRoute)
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File Image is too large" });
    }
  }
  res.status(500).json({ message: err.message || "Server error" });
});

// connect to database and run the backend server 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => console.log("Server running on port 5000"));
  }).catch(err => console.log(err));
