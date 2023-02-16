const express = require("express");
const router = express.Router();

const {
    singlePostController,
    getQueryController,
    deleteDocController,
    getSingleDocController,
    updateDocController,
} = require("../controllers/docApi");

const authGuard = require("../middlewares/authGuard");

router.get("/", getQueryController);

// Get single Document
router.get("/:id", getSingleDocController);

// Post a document
router.post("/", authGuard, singlePostController);

// Delete a doc
router.delete("/:id", authGuard, deleteDocController);

// Update a doc
router.patch("/:id", authGuard, updateDocController);

module.exports = router;
