const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const multer = require("multer");
const upload = multer();

const requireAuth = require("../middlewares/auth.middleware");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user
router.get("/:id", userController.userInfo);
router.post("/upload", upload.single("file"), userController.updateImgProfil);

module.exports = router;
