const db = require("../config/db").getDB();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// create post
module.exports.createPost = async (req, res, next) => {
	if (req.file !== null) {
		try {
			if (req.file.detectedMimeType != "image/jpg" && req.file.detectedMimeType != "image/png" && req.file.detectedMimeType != "image/jpeg" && req.file.detectedMimeType != "image/gif") throw Error("invalid file");
			if (req.file.size > 2500000) throw Error("max size");
		} catch (err) {
			return res.status(201).json({ err });
		}

		if (req.file.detectedMimeType == "image/gif") {
			fileName = req.body.posterId + Date.now() + ".gif";
		} else {
			fileName = req.body.posterId + Date.now() + ".jpg";
		}

		const path = `${__dirname}/../../client/public/uploads/posts/${fileName}`;

		await pipeline(req.file.stream, fs.createWriteStream(path));
	}

	const newPost = {
		posterId: req.body.posterId,
		message: req.body.message,
		picture: req.file !== null ? "./uploads/posts/" + fileName : "",
		video: req.body.video,
		reddit: req.body.reddit,
		timestamps: req.body.timestamps,
	};

	try {
		const sqlRequest = `INSERT INTO post (poster_id, post_message, post_picture, post_video, post_date, post_reddit ) VALUES ('${newPost.posterId}', '${newPost.message}', '${newPost.picture}', '${newPost.video}', '${newPost.timestamps}', '${newPost.reddit}')`;
		db.query(sqlRequest, (err, result) => {
			if (err) {
				res.status(500).json({ err });
			}
			res.status(200).json(result);
		});
	} catch (err) {
		return res.status(400).send(err);
	}
};

// get all posts
module.exports.getAllPosts = (req, res, next) => {
	const sqlRequest = "SELECT * FROM post ORDER BY post_id DESC";
	db.query(sqlRequest, (err, result) => {
		if (err) res.status(404).json({ err });
		res.status(200).json(result);
	});
};

// update post
module.exports.updatePost = (req, res, next) => {
	const sqlRequest = `UPDATE post SET post_message = "${req.body.textUpdate}" WHERE post_id = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		res.status(200).json(result);
	});
};

// delete post and all the comments
module.exports.deletePost = (req, res, next) => {
	const sqlRequest = `DELETE FROM post WHERE post_id = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		const sqlRequest = `DELETE FROM comment WHERE comment_post_id = ${req.params.id}`;
		db.query(sqlRequest, (err, result) => {
			if (err) {
				res.status(404).json({ err });
			}
			res.status(200).json(result);
		});
	});
};

//number of like(s)
module.exports.numberOfLike = (req, res, next) => {
	const sqlRequest = `SELECT * FROM heart WHERE post_id = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		res.status(200).json(result);
	});
};

// does user already like
module.exports.alreadyLike = (req, res, next) => {
	const sqlRequest = `SELECT post_id, user_id FROM heart WHERE user_id = ${req.body.userId} AND post_id = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		if (result.length === 0) {
			res.status(200).json(false);
		} else {
			res.status(200).json(true);
		}
	});
};

// like post
module.exports.likeUnlike = (req, res, next) => {
	const sqlRequest = `SELECT post_id, user_id FROM heart WHERE user_id = ${req.body.userId} AND post_id = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		if (result.length === 0) {
			const sqlRequest = `INSERT INTO heart (user_id, post_id) VALUES (${req.body.userId}, ${req.params.id})`;
			db.query(sqlRequest, (err, result) => {
				if (err) {
					res.status(404).json({ err });
					throw err;
				}
				res.status(200).json(true);
			});
		} else {
			const sqlRequest = `DELETE FROM heart WHERE user_id = ${req.body.userId} AND post_id = ${req.params.id}`;
			db.query(sqlRequest, (err, result) => {
				if (err) {
					res.status(404).json(err);
					throw err;
				}
				res.status(200).json(false);
			});
		}
	});
};
