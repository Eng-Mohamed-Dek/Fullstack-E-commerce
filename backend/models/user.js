import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  
  cartData: {
    type: Object
  },

  data: {
    type: Date,
    default: Date.now
  },

  // to reset password 
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

export default mongoose.model('User', userSchema, 'Users');
