const router = require("express").Router();
const postController = require("../controllers/post.controller");
const { checkUser } = require("../middlewares/auth.middleware");

const multer = require("multer");
const upload = multer();

router.get("/", checkUser, postController.getAllPosts);
router.post("/", checkUser, upload.single("file"), postController.createPost);
router.post("/:id", checkUser, postController.updatePost);
router.delete("/:id", checkUser, postController.deletePost);

//likes
router.get("/likes/:id", checkUser, postController.numberOfLike);
router.post("/likes/:id", checkUser, postController.alreadyLike);
router.post("/like-unlike/:id", checkUser, postController.likeUnlike);

module.exports = router;
