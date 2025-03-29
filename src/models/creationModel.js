const mongoose = require("mongoose");

const creationSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
});

// Get the next available id for new creation
const getNextId = async () => {
    const lastCreation = await Creation.findOne().sort({ id: -1 }); // Find the last creation by id
    return lastCreation ? lastCreation.id + 1 : 1; // Return the next id
};

const Creation = mongoose.model("Creation", creationSchema);

module.exports = { Creation, getNextId };
