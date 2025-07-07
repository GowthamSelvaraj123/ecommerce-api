const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const JWT_SECRET = process.env.JWT_SECRET || 'ecommerce@123';
require('dotenv').config();
const register = async (req, res) => {
    try {
        const { name, email, password, phone, address, roles } = req.body;
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            roles: roles || ['user']
        });
        await newUser.save();
        res.status(201).json({ message: "Registered Successfully", user: newUser });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration Failed", error: err.message });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email Not Found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                roles: user.roles
            },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
        res.status(200).json({
            message: "Login successful", token, user: { _id: user._id, name: user.name, email: user.email, roles: user.roles }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Login Failed", error: err.message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found with this email" });
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetToken = hashedToken;
        user.tokenExpiry = Date.now() + 1000 * 60 * 15;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: "Password Reset Request",
            html: `<p>You requested to reset your password.</p>
                   <p>Click <a href="${resetLink}">here</a> to reset it. This link will expire in 15 minutes.</p>`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Password reset link sent to email", data: resetLink });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error sending reset email", error: err.message });
    }
}
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetToken: hashedToken,
            tokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Reset token is invalid or expired" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.tokenExpiry = undefined;

        await user.save();

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to reset password", error: err.message });
    }
}
const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout Successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Logout Failed", error: err.message });
    }
}
const emailVerifictation = async (req, res) => {
    try {
        res.status(200).json({ message: "Password Updated Successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Password Updated Failed", error: err.message });
    }
}
const profile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "Profile fetched successfully",
            user
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch profile", error: err.message });
    }
};

module.exports = { register, login, profile, forgotPassword, resetPassword }
