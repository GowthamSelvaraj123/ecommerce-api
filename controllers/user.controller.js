const User = require("../models/user.model");
const usersList = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            res.status(401).json({ status: true, message: "Users Not Found" });
        }
        res.status(200).json({ status: true, message: "Get User Successfully", data: users });
    }
    catch (err) {
        res.status(500).json({ status: false, message: "Not Get User Succesfully", error: err });
    }
}
const singleUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(401).json({ status: true, message: "Users Not Found" });
        }
        const singleUser = await User.findById(id);
        res.status(200).json({ status: true, message: "Get Single User Successfully", data: singleUser });
    }
    catch (err) {
        res.status(500).json({ status: false, message: "Not Get User Succesfully", error: err });
    }
}
const addUser = async (req, res) => {
    try {
        const { name, email, phone, address, password, roles } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "Name, email, and password are required",
            });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ status: false, message: "Email already in use" });
        }
        const newUser = new User({
            name,
            email,
            phone,
            address,
            password,
            roles: roles || ['user'],
        }); await newUser.save();
        res.status(201).json({ status: true, message: "User added successfully", data: newUser });
    }
    catch (err) {
        res.status(500).json({ status: false, message: "Error adding user", error: err.message });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(401).json({ status: true, message: "Users Not Found" });
        }
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(201).json({ status: true, message: "User Deleted successfully", data: deleteUser });
    }
    catch (err) {
        res.status(500).json({ status: false, message: "Error adding user", error: err.message });
    }
}
module.exports = { usersList, singleUser, addUser, deleteUser }