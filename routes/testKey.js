const express = require("express");
const router = express.Router();

const { uploadKey, getKey, deleteKey } = require("../Controllers/testKey");

router.post("/upload-key", uploadKey);
router.get("/get-key-id/:id", getKey);
router.delete("/delete-key/:id", deleteKey);

module.exports = router;
