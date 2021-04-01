const express = require("express");
const authRouter = express.Router();
const bodyJSON = express.json();
const { register, login, getUser } = require("../controllers/userCTRL");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");
const dotenv = require("dotenv");
const secret_key = process.env.SECRET_KEY;

const loginCheck = (req, res, next) => {
  passport.authenticate;
  "jwt",
    { session: false },
    (err, user) => {
      if (!user || error) {
        return res.status(401).json({
          status: "Error",
          code: 401,
          message: "Error",
        });
      }
      req.user = user;
      next();
    };
};
//================================================Регистрация
authRouter.post("/auth/register", register);

//================================================Логинизация
authRouter.post("/auth/login", login);

//================================================Делогинизация
authRouter.post("/auth/logout", register);

//================================================Получение данных по токену
authRouter.get("/users/current", loginCheck, getUser);

module.exports = {
  authRouter,
};
