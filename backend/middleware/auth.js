// middleware/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
  try {  
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data.user;
    
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default auth;

