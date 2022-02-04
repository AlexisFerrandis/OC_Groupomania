const express = require("express");

const cors = require("cors");
const corsOptions = require("./config/cors");

const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors(corsOptions));

// FILES
// auth
// user
// post
// comment

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// ROUTES
// auth
// user
// post
// comment

module.exports = app;
