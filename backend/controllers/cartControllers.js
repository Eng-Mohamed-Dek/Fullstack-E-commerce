
import User from "../models/user.js";

export const addCart = async (req, res) => {
    const currentUser = await User.findOne({ _id: req.user.id })

    try {
        currentUser.cartData[req.body.id] += 1;

        const userUpdated = await User.findOneAndUpdate({ _id: req.user.id }, { cartData: currentUser.cartData })

        res.status(201).json({
            userUpdated,
            success: true,
            message: "Added to cart successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const removeCart = async (req, res) => {
    const currentUser = await User.findOne({ _id: req.user.id })
    try {

        if (currentUser.cartData[req.body.id] > 0) {
            currentUser.cartData[req.body.id] -= 1;
        }

        const userUpdated = await User.findOneAndUpdate({ _id: req.user.id }, { cartData: currentUser.cartData })

        res.status(201).json({
            userUpdated,
            success: true,
            message: "removed from the cart successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const getCarts = async (req, res) => {
    const currentUser = await User.findOne({ _id: req.user.id })
    try {
        res.status(201).json({
            carts: currentUser.cartData,
            success: true,
            message: "cart data loaded",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};