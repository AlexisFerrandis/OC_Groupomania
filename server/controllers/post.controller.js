const db = require("../config/db").getDB();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// create post
module.exports.createPost = async (req, res, next) => {
	if (req.file !== null) {
		try {
			if (req.file.detectedMimeType != "image/jpg" && req.file.detectedMimeType != "image/png" && req.file.detectedMimeType != "image/jpeg") throw Error("invalid file");
			if (req.file.size > 500000) throw Error("max size");
		} catch (err) {
			return res.status(201).json({ err });
		}

		fileName = req.body.posterId + Date.now() + ".jpg";
		const path = `${__dirname}/../../client/public/uploads/posts/${fileName}`;

		await pipeline(req.file.stream, fs.createWriteStream(path));
	}

	const newPost = {
		posterId: req.body.posterId,
		message: req.body.message,
		picture: req.file !== null ? "./uploads/posts/" + fileName : "",
		video: req.body.video,
		timestamps: req.body.timestamps,
	};

	try {
		const sqlRequest = `INSERT INTO post (poster_id, post_message, post_picture, post_video, post_date ) VALUES ('${newPost.posterId}', '${newPost.message}', '${newPost.picture}', '${newPost.video}', '${newPost.timestamps}')`;
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
	next();
};

// update post
module.exports.updatePost = (req, res, next) => {
	next();
};

// delete post
module.exports.deletePost = (req, res, next) => {
	next();
};
