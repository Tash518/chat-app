import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be atleast 6 characters long" });
        }
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "user already exists with this email" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })
        if (newUser) {
            //enerating jwt
            await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        } else {
            res.status(400).json({ message: "invalid user data" })
        }

    } catch (error) {
        console.log("signup contoller error", error);
        res.status(500).json({ message: "internal server error" });
    }
}
export const login = async (req, res) => {
    console.log("login controller called with body:", req.body);
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(400).json({ message: "invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("password doesnot match for email:", email);
            return res.status(400).json({ message: "invalid credentials" });
        }
        //enerate jwt
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("loin controller error", error.message);
        res.status(500).json({ message: "internal server error" })

    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "logged out successfully" });
    } catch (error) {
        console.log("logout controller error", error.message);
        res.status(500).json({ message: "internal server error" });
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userID = req.user._id;
        if (!profilePic) return res.status(400).json({ message: "missin prifile picture" });
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userID, { profilePic: uploadResponse.secure_url }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("updateProfile controller error", error.message);
        res.status(500).json({ message: "internal server error" });
    }

}
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("checkAuth controller error", error);
        res.status(500).json({ message: "internal server error" });

    }

}