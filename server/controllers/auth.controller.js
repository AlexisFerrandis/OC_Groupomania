const bcrypt = require("bcrypt");
const dbConnexion = require("../config/db");

// signup
exports.signUp = async (req, res) => {
	try {
		const user_password = req.body.password;

		// salt pwd
		const salt = await bcrypt.genSalt(9);
		const saltPassword = await bcrypt.hash(user_password, salt);

		const user = {
			...req.body,
			user_password: saltPassword,
		};

		const sqlRequest = `INSERT INTO user (name, firstname, mail, user_password) VALUES ('${user.name}', '${user.firstname}', '${user.mail}', '${user.user_password}')`;
		const db = dbConnexion.getDB();

		db.query(sqlRequest, user, (err, result) => {
			if (err) {
				res.status(200).json({ err: "email already exist" });
				return;
			} else {
				res.status(201).json({ message: "user created, welcome " + user.name });
			}
		});
	} catch (err) {
		res.status(200).json({ message: "register failed", err });
	}
};

module.exports.signIn = async (req, res) => {
	console.log("here");
};
