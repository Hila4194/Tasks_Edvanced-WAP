const express = require("express");
const router = express.Router();
const post = require("../controllers/posts_controllers");

router.get("/", post.getAllposts);
router.get("/:id", post.getpostById);
router.post("/",post.createPost);
router.put("/:id",post.updatePost);

module.exports = router;