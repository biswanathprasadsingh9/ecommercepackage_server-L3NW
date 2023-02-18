const express = require("express");
const router = express.Router();

const BlogController = require("../controllers/BlogController");

router.get("/", BlogController.index);
router.get("/:id", BlogController.view);
router.post("/", BlogController.store);
router.post("/update", BlogController.update);
router.get("/deletefile/:id", BlogController.deletefile);

module.exports = router;
