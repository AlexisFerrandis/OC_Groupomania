const router = require("express").Router();
const commentController = require("../controllers/comment.controller");

//comments
router.get("/:id", commentController.getAllComments);
router.post("/:id", commentController.commentPost);
router.delete("/:id", commentController.deleteCommentPost);

module.exports = router;
