const db = require("../config/db").getDB();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.cookies.jwt;
	try {
		if (token) {
			jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
				if (err) {
					res.locals.user = null;
					res.cookie("jwt", "", { maxAge: 1 });
					next();
				} else {
					const sqlRequest = `SELECT user_id FROM user WHERE user_id = 4`;
					db.query(sqlRequest, (err, result) => {
						if (err) res.status(204).json({ err });
						else {
							next();
						}
					});
				}
			});
		} else {
			res.cookie("jwt", "", { maxAge: 1 });
			res.status(401).json({ message: "unauthorized" });
		}
	} catch (err) {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(401).json({ message: "unauthorized" });
	}
};
