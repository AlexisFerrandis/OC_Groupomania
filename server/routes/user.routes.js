const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const requireAuth = require("../middlewares/auth.middleware");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user
router.get("/:id", requireAuth, userController.userInfo);
router.put("/:id", requireAuth, userController.updateUser);

module.exports = router;
