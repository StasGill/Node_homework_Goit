const express = require("express");
const contactsRouter = express.Router();
const bodyJSON = express.json();
const {
  getAllUser,
  getFilteredUser,
  getByIdUser,
  addNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/contactCTRL");

//================================================Все контакты
contactsRouter.get("/", getAllUser);

//================================================Поиск по имени
contactsRouter.get("/filter", getFilteredUser);

//================================================Контакты по айди
contactsRouter.get("/:id", getByIdUser);

//================================================Добавление нового контакта
contactsRouter.post("/", bodyJSON, addNewUser);

//================================================Обновление контакта
contactsRouter.patch("/:id", bodyJSON, updateUser);

//================================================Удаление контакта
contactsRouter.delete("/:id", deleteUser);

module.exports = {
  contactsRouter,
};
