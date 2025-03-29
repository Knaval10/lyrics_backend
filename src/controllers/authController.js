const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Superadmin credentials (hardcoded and fixed)
const superadminEmail = process.env.SUPERADMIN_EMAIL;
const superadminPassword = process.env.SUPERADMIN_PASSWORD;

const generateToken = (id, role = "user") => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields: name, email, and password" });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user", // Default role is 'user'
        });

        // Return user data with JWT token on successful registration
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id, user.role),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        // Catch any error during the registration process
        console.error(error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password" });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id, user.role),
            });
        } else {
            res.status(401).json({message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during login" });
    }
};

const superAdminLogin = async (req, res) => {
    const { email, password } = req.body;
console.log("email",email,password)
    if (email !== superadminEmail || password !== superadminPassword) {
        return res.status(401).json({ message: "Invalid superadmin credentials" });
    }

    const token = generateToken("superadmin", "superadmin");

    res.status(200).json({ token });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (role !== "admin" && role !== "user") {
        return res.status(400).json({ message: "Invalid role provided" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = role;
        await user.save();

        res.status(200).json({ message: "User role updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user role" });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching user profile" });
    }
};

module.exports = { registerUser, loginUser, superAdminLogin, getUserProfile, getAllUsers, updateUserRole };
