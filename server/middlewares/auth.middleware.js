const jwt = require("jsonwebtoken");

// deliver jwt
module.exports.requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	try {
		if (token) {
			jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
				if (err) {
					res.cookie("jwt", "", { maxAge: 1 });
					next();
				} else {
					res.status(200).json(decodedToken);
				}
			});
		} else {
			res.cookie("jwt", "", { maxAge: 1 });
			res.status(401);
		}
	} catch (err) {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(401);
	}
};

// check jwt on every routes
module.exports.checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				res.cookie("jwt", "", { maxAge: 1 });
				res.status(401);
			} else {
				next();
			}
		});
	} else {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(401);
	}
};
