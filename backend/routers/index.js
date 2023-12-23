const express = require("express");
const router = new express.Router();
const UserController = require("../constrollers/UserController.js")
const {SchemaMiddleware} = require("../middlewares/SchemaMiddlewares.js");
const UserSchema = require("../schemas/UserShema.js");
const upload = require("../middlewares/upload.js");
const { VerifyAccessToken, VerifyRefreshToken } = require("../middlewares/AuthMiddleware.js");

router.post("/register", upload.single("picture"), SchemaMiddleware(UserSchema.Register),  UserController.Register);
router.post("/login", SchemaMiddleware(UserSchema.Login), UserController.Login);
router.get("/load-user", VerifyRefreshToken, UserController.LoadUser)
router.post("/update-user", upload.single("picture"), VerifyAccessToken, SchemaMiddleware(UserSchema.Update), UserController.UpdateUser)

router.get("/other-users",  VerifyAccessToken,  UserController.GetOrherUsers)
module.exports = router