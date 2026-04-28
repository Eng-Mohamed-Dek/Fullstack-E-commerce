import express from 'express';
import { addCart, getCarts, removeCart } from '../controllers/cartControllers.js';
import auth from '../middleware/auth.js';

const route = express.Router()

route.post('/addCart', auth, addCart)
route.post('/removeCart', auth, removeCart)
route.get('/getCart', auth, getCarts)
  
export default route