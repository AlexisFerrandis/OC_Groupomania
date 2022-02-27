const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();

router.get("/", postController.getAllPosts);
router.post("/", upload.single("file"), postController.createPost);
router.post("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

//likes
router.get("/likes/:id", postController.numberOfLike);
router.post("/likes/:id", postController.alreadyLike);
router.post("/like-unlike/:id", postController.likeUnlike);

module.exports = router;
