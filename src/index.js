const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const creationRoutes=require("./routes/creationRoutes")

// Connect to the database
connectDB();
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // This ensures that body data is parsed as JSON

// CORS middleware if you're testing from a different origin
app.use(cors());

// Use auth routes
app.use("/api/auth", authRoutes);
app.use("/api/creation",creationRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
