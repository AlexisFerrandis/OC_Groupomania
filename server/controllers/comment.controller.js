const db = require("../config/db").getDB();

// get all comments
module.exports.getAllComments = async (req, res, next) => {
	const sqlRequest = `SELECT * FROM comment WHERE comment_post_id = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
			console.log(err);
			throw err;
		}
		res.status(200).json(result);
	});
};

// create a post
module.exports.commentPost = async (req, res, next) => {
	const { message, commentUserId, commentUserFirstName, commentUserLastName, commentUserPicture, timestamps } = req.body;
	const postId = req.params.id;
	const sqlRequest = `INSERT INTO comment ( comment_post_id, comment_user_id, comment_user_first_name, comment_user_last_name, comment_user_picture, comment_message, comment_date) VALUES ( ${postId}, ${commentUserId},              "${commentUserFirstName}", "${commentUserLastName}", "${commentUserPicture}",              "${message}", "${timestamps}")`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
			console.log(err);
			throw err;
		}
		res.status(200).json(result);
	});
};

// delete a comment
module.exports.deleteCommentPost = async (req, res, next) => {
	const sqlRequest = `DELETE FROM comment WHERE comment_id = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		res.status(200).json(result);
	});
};
