const router = require("express").Router();
const commentController = require("../controllers/comment.controller");
const { checkUser } = require("../middlewares/auth.middleware");

//comments
router.get("/:id", checkUser, commentController.getAllComments);
router.post("/:id", checkUser, commentController.commentPost);
router.delete("/:id", checkUser, commentController.deleteCommentPost);

module.exports = router;
