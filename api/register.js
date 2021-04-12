const express = require("express");
const authRouter = express.Router();
const bodyJSON = express.json();
const {
  register,
  login,
  getUser,
  logout,
  getAvatar,
  doEmailVerifi,
  doEmailSendVerifi,
} = require("../controllers/userCTRL");
const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModels");
// const dotenv = require("dotenv");
// const secret_key = process.env.SECRET_KEY;
// const UserModel = require("../models/userModels");
// const { require } = require("yargs");
const path = require("path");
const fs = require("fs").promises;
const uploadMiddlewar = require("../services/uploadService");

const loginCheck = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
//================================================Регистрация
authRouter.post("/auth/register", register);

//================================================Логинизация
authRouter.post("/auth/login", login);

//================================================Делогинизация
authRouter.post("/auth/logout", loginCheck, logout);

//================================================Получение данных по токену
authRouter.get("/current", loginCheck, getUser);

//================================================Загрузка аватара
authRouter.patch(
  "/avatars",
  loginCheck,
  uploadMiddlewar.single("photo"),
  getAvatar
);

//================================================Верификация по емейлу
authRouter.get("/verify/:verificationToken", doEmailVerifi);

authRouter.post("/verify", doEmailSendVerifi);

module.exports = {
  authRouter,
};
