require("dotenv").config({ path: "./config/.env" });

module.exports = (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
};
