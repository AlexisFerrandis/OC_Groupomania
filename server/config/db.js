const mysql = require("mysql");
require("dotenv").config({ path: "./config/.env" });

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

module.exports.getDB = () => {
	return db;
};
