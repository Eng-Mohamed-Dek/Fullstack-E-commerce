import express from 'express';
import AdminLogin  from '../controllers/adminController.js'
const route = express.Router()

// login admin 
route.post('/admin-login', AdminLogin)


export default route;

// METHOD - post, get, update, delete