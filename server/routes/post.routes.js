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

// //comments
// router.patch("/comment-post/:id", postController.commentPost);
// router.patch("/edit-comment-post/:id", postController.editCommentPost);
// router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
