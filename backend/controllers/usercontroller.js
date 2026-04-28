import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import crypto from 'crypto';
import sendEmail from '../config/sendMail.js';
// import sendEmail from '../utils/sendEmail.js';

// register user
const Register = async (req, res) => {
    const { name, email, password } = req.body;

    // validate name
    if (!name) {
        return res.status(400).json({ message: 'name is required' });
    }

    // Validate Gmail address
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (!gmailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid Gmail address (must end with @gmail.com)' });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be strong.',
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this Gmail already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // default cart value 
        const cart = []

        for (let i = 0; i < 300; i++) {
            cart[i] = 0
        }

        const result = await User.create({ name, email, password: hashedPassword, cartData: cart });

        // auth user to get cartdata 
        const data = {
            user: {
                id: result._id
            }
        }

        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ result, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong while registering" });
    }
}


// login user
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        if (isPasswordCorrect) {
            const data = {
                user: {
                    id: user._id
                }
            }

            const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ result: user, token });
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

const ResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: 'New password is required' });
    }

    const hashToken = crypto.createHash('sha256').update(token).digest('hex')

    try {
        const user = await User.findOne({
            resetPasswordToken: hashToken,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) return res.status(400).json({ message: 'Token is invalid or has expired' });

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must be strong',
            });
        }

        user.password = await bcrypt.hash(newPassword, 12)

        user.resetPasswordExpires = undefined;
        user.resetPasswordToken = undefined;

        await user.save()
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Could not reset password' });
    }

}

const ForgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!user) return res.status(400).json({ message: 'Token is invalid or has expired' });

        const resetToken = crypto.randomBytes(32).toString('hex')
        const hashToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        user.resetPasswordToken = hashToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1hr

        const resetLink = `${process.env.CLIENT_API}/reset-password?token=${resetToken}`

        const html = ` <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <tr>
                <td style="text-align: center; padding: 20px;">
                </td>
            </tr>
            <tr>
            <td style="padding: 0 30px 30px 30px;">
                <h2 style="color: #333; font-family: Poppins, 'san-serif'; text-align: center;">Reset Your Password</h2>
                <p style="color: #555; text-align: center;" >We received a request to reset your password. Click the button below to proceed. If you didn’t request a password reset, you can ignore this email.</p>
                <!-- BUTTON -->
                <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="background-color: #475569; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; cursor: pointer;">Reset Password</a>
                </div>
                <p style="color: #999; font-size: 12px; text-align: center;">This link will expire in 1 hour for your security.</p>
            </td>
            </tr>
            <tr>
            <td style="text-align: center; font-size: 12px; color: #aaa; padding: 20px;">
                &copy; 2025 Pafon Store. All rights reserved.
            </td>
            </tr>
        </table>
        </body>
        </html>`

        await sendEmail({
            to: user.email,
            subject: "Password Reset",
            html
        })


        await user.save()
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }

}

// logout password
const Logout = async (req, res) => {
    res.status(200).json({ message: 'User logged out successfully' });
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // select any fields you need
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export { Register, Login, Logout, ResetPassword, ForgotPassword, }