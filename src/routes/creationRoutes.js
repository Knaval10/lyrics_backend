const express = require("express");
const router = express.Router();
const creationController = require("../controllers/creationController");
const creationMiddleware = require("../middleware/creationMiddleware");

// Create a new creation (validate data)
router.post("/", creationMiddleware.validateCreationData, creationController.createCreation);

// Get all creations
router.get("/", creationController.getAllCreations);

// Get a single creation by ID (validate ID format and check if creation exists)
router.get("/:id", 
    creationMiddleware.validateCreationId, 
    creationMiddleware.checkCreationExists, 
    creationController.getCreationById
);

// Update a creation by ID (validate data and check if creation exists)
router.put("/:id", 
    creationMiddleware.validateCreationId, 
    creationMiddleware.validateCreationData, 
    creationMiddleware.checkCreationExists, 
    creationController.updateCreation
);

// Delete a creation by ID (check if creation exists)
router.delete("/:id", 
    creationMiddleware.validateCreationId, 
    creationMiddleware.checkCreationExists, 
    creationController.deleteCreation
);

// Delete all creations
router.delete("/", creationController.deleteAllCreations);

module.exports = router;
