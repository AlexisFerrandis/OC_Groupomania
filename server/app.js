const express = require("express");

// cors
const corsOptions = require("./config/cors");

// auth
const requireAuth = require("./middlewares/auth.middleware");

// tools
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user.routes");
// const postRoutes = require("./routes/post.routes");
// const commentRoutes = require("./routes/comment.routes");

const app = express();

app.use(corsOptions);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/jwtid", requireAuth, (req, res) => {
	res.status(200);
});

app.use("/api/user", userRoutes);
// app.use("/api/post", postRoutes);
// app.use("/api/comment", commentRoutes);

module.exports = app;
