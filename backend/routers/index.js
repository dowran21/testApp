const express = require("express");
const router = new express.Router();
const UserController = require("../constrollers/UserController.js")
const {SchemaMiddleware} = require("../middlewares/SchemaMiddlewares.js");
const UserSchema = require("../schemas/UserShema.js");
const upload = require("../middlewares/upload.js");
const { VerifyAccessToken } = require("../middlewares/AuthMiddleware.js");

router.post("/register", upload.single("picture"), SchemaMiddleware(UserSchema.Register),  UserController.Register);
router.post("/login", SchemaMiddleware(UserSchema.Login), UserController.Login);

router.get("/other-users",  VerifyAccessToken,  UserController.GetOrherUsers)
module.exports = router