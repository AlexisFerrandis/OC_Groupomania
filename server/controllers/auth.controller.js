const bcrypt = require("bcrypt");
const db = require("../config/db").getDB();
const jwt = require("jsonwebtoken");

// signup
module.exports.signUp = async (req, res) => {
	try {
		const userPassword = req.body.password;
		// salt pwd
		const salt = await bcrypt.genSalt(9);
		const hash = await bcrypt.hash(userPassword, salt);

		const user = {
			...req.body,
			password: hash,
		};

		// TODO check values for security

		const sqlRequest = `INSERT INTO user (user_first_name, user_last_name, user_mail, user_password) VALUES ('${user.firstname}', '${user.lastname}', '${user.mail}', '${user.password}')`;
		db.query(sqlRequest, user, (err, result) => {
			if (err) {
				res.status(200).json({ err: "email already exist" });
				return;
			} else {
				res.status(201).json({ message: "user created, welcome " + user.firstname });
			}
		});
	} catch (err) {
		res.status(200).json({ message: "register failed", err });
	}
};

// signin
module.exports.signIn = async (req, res) => {
	const userMail = req.body.mail;
	const sqlRequest = `SELECT user_first_name, user_last_name, user_password, user_id FROM user WHERE user_mail='${userMail}'`;

	db.query(sqlRequest, async (err, result) => {
		if (err) return res.status(404).json({ err });

		if (result[0]) {
			try {
				const userPassword = req.body.password;
				const hashedPassword = result[0].user_password;
				const auth = await bcrypt.compare(userPassword, hashedPassword);
				if (auth) {
					// email found & password ✔️
					const maxAge = 1 * (24 * 60 * 60 * 1000);
					const userId = result[0].id;
					const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
						expiresIn: maxAge,
					});
					res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge, sameSite: true, secure: true });
					return res.status(200).json({ message: "logged" });
				}
			} catch (err) {
				return res.status(400).json({ err });
			}
		} else if (!result[0]) {
			res.status(200).json({ message: "incorrect mail or password" });
		}
	});
};

// logout
module.exports.logout = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/");
};
