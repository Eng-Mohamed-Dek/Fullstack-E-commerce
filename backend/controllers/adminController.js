import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const AdminLogin = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password)


    if(email !== process.env.ADMIN_EMAIL) {
        return res.status(401).json({ message: "userkaan majiro" })
    }

    if(password !== process.env.ADMIN_PASS) {
        return res.status(401).json({ message: "passwordka waa qalad" })
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.json({message: "Login Successfully", token})
}

export default AdminLogin