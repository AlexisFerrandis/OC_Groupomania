const express = require("express");

const cors = require("cors");
const corsOptions = require("./config/cors");

const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);

module.exports = app;
