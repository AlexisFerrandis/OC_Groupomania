const db = require("../config/db").getDB();

module.exports.userInfo = (req, res, next) => {
	const { id: userId } = req.params;
	const sqlRequest = `SELECT * FROM user WHERE user_id = ${userId};`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		res.status(200).json(result[0]);
	});
};

module.exports.updateUser = (req, res, next) => {
	// if profil pic
	if (req.file) {
	}
};
