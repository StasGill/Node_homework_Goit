const express = require("express");
const authRouter = express.Router();
const bodyJSON = express.json();
const { register, login, getUser } = require("../controllers/userCTRL");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");
const dotenv = require("dotenv");
const secret_key = process.env.SECRET_KEY;
const UserModel = require("../models/userModels");

const loginCheck = (req, res, next) => {
  console.log(req.headers);
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not enough status",
      });
    }
    req.user = user;
    next();
  });
};
//================================================Регистрация
authRouter.post("/auth/register", register);

//================================================Логинизация
authRouter.post("/auth/login", login);

//================================================Делогинизация
authRouter.post("/auth/logout", register);

//================================================Получение данных по токену
authRouter.get("/current", loginCheck, getUser);

module.exports = {
  authRouter,
};
