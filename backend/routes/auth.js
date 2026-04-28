import express from 'express';
import dotenv from 'dotenv';
import {  ForgotPassword, getAllUsers, Login, Logout, Register, ResetPassword } from '../controllers/usercontroller.js';

dotenv.config();
const router = express.Router();

// register user 
router.post('/register', Register);

// login user 
router.post('/login', Login);


// forgot Password 
router.post('/forgot-password', ForgotPassword);


// reset password 
router.post('/reset-password', ResetPassword);


// logout password
router.post('/logout', Logout);
router.get('/users', getAllUsers);


export default router;

