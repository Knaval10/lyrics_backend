const { Creation, getNextId } = require("../models/creationModel");

// Create a new creation
exports.createCreation = async (req, res) => {
    try {
        const nextId = await getNextId(); // Get the next sequential ID
        if (isNaN(nextId)) {
            return res.status(400).json({ message: "Invalid ID generation" });
        }

        const newCreation = new Creation({ id: nextId, ...req.body }); // Assign the next id
        await newCreation.save();
        res.status(201).json(newCreation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all creations
exports.getAllCreations = async (req, res) => {
    try {
        const creations = await Creation.find();
        res.status(200).json(creations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single creation by ID
exports.getCreationById = async (req, res) => {
    try {
        const creationId = parseInt(req.params.id, 10);
        if (isNaN(creationId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const creation = await Creation.findOne({ id: creationId });
        if (!creation) return res.status(404).json({ message: "Creation not found" });
        res.status(200).json(creation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a creation by ID
exports.updateCreation = async (req, res) => {
    try {
        const { title, content } = req.body;
        const creationId = parseInt(req.params.id, 10);
        if (isNaN(creationId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const updatedCreation = await Creation.findOneAndUpdate(
            { id: creationId }, 
            { title, content },
            { new: true, runValidators: true }
        );
        if (!updatedCreation) return res.status(404).json({ message: "Creation not found" });
        res.status(200).json(updatedCreation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a creation by ID
exports.deleteCreation = async (req, res) => {
    try {
        const creationId = parseInt(req.params.id, 10);
        if (isNaN(creationId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const deletedCreation = await Creation.findOneAndDelete({ id: creationId });
        if (!deletedCreation) return res.status(404).json({ message: "Creation not found" });
        res.status(200).json({ message: "Creation deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete all creations
exports.deleteAllCreations = async (req, res) => {
    try {
        await Creation.deleteMany();
        res.status(200).json({ message: "All creations deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
