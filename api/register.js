const express = require("express");
const authRouter = express.Router();
const bodyJSON = express.json();
const { register } = require("../controllers/userCTRL");

//================================================Регистрация
authRouter.post("/auth/register", bodyJSON, register);

//================================================Логинизация
authRouter.post("/auth/login", register);

//================================================Делогинизация
authRouter.post("/auth/logout", register);

//================================================Получение данных по токену
authRouter.get("/users/current", register);

module.exports = {
  authRouter,
};
