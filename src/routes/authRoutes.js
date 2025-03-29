const express = require("express");
const { registerUser, loginUser, superAdminLogin, getAllUsers, updateUserRole, getUserProfile } = require("../controllers/authController");
const { protect, isSuperAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes for registration and login
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protect, getUserProfile);

// Superadmin routes
router.post("/superadmin/login", superAdminLogin); // Superadmin login
router.get("/superadmin/users", protect, isSuperAdmin, getAllUsers); // Get all users (superadmin only)
router.patch("/superadmin/users/:id/role", protect, isSuperAdmin, updateUserRole); // Update user role (superadmin only)

module.exports = router;
