const express = require("express");

const app = express();
const PORT = 3000;

// Middleware (optional)
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Hello, Lyrics Backend!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
