import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { upload } from '../config/upload.js';

const route = express.Router()


route.post('/create-product', upload.single('image'), addProduct)
route.get('/get-products', getProducts)
route.delete('/delete/:id', deleteProduct)
route.put("/update/:id", upload.single("image"), updateProduct);
  
export default route