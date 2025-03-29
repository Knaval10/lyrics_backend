const { Creation } = require("../models/creationModel");

// Middleware to check if creation exists by ID
exports.checkCreationExists = async (req, res, next) => {
    try {
        const creationId = parseInt(req.params.id, 10);
        if (isNaN(creationId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const creation = await Creation.findOne({ id: creationId });
        if (!creation) {
            return res.status(404).json({ message: "Creation not found" });
        }

        req.creation = creation; // Attach the creation to the request object
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Middleware to validate creation data
exports.validateCreationData = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }
    next();
};

// Middleware to validate creation ID format
exports.validateCreationId = (req, res, next) => {
    const creationId = parseInt(req.params.id, 10);
    if (isNaN(creationId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    next();
};
