const express = require("express");
const contactsRouter = express.Router();
const bodyJSON = express.json();
const shortId = require("shortid");
const fs = require("fs");
const path = require("path");
const contacts = require("../db/contacts.json");

const contactPath = path.join(__dirname, "../", "db", "contacts.json");

//================================================Запись данных
const writeFile = async (contactsPath, data) => {
  fs.writeFile(contactsPath, data, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

//================================================Все контакты
contactsRouter.get("/", (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredContacts = contacts.filter((item) =>
      item.name.includes(name)
    );
    if (filteredContacts.length == 0) {
      res.statusCode = 200;
      res.send();
    } else {
      res.statusCode = 200;
      res.send(filteredContacts);
    }
  } else {
    res.statusCode = 200;
    res.send(contacts);
  }
});

//================================================Контакты по айди
contactsRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const contactById = contacts.find((item) => item.id === +id);

  if (contactById) {
    res.send(contactById);
  } else {
    res.statusCode = 404;
    res.json({
      status: "Fail",
      code: 404,
      message: "Not found",
    });
    res.send();
  }
});

//================================================Добавление нового контакта
contactsRouter.post("/", bodyJSON, (req, res) => {
  const newContact = {
    _id: shortId(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  if (req.body.name && req.body.email && req.body.phone) {
    contacts.push(newContact);
    writeFile(contactPath, JSON.stringify(contacts));
    const lastEl = contacts[contacts.length - 1];
    res.statusCode = 201;
    res.send(lastEl);
  } else {
    res.statusCode = 400;
    res.json({
      status: "Fail",
      code: 204,
      message: "missing required name field",
    });
    res.send();
  }
});

//================================================Обновление контакта
contactsRouter.patch("/:id", bodyJSON, (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const indx = contacts.findIndex((item) => item.id === +id);

  if (Object.keys(body).length == 0) {
    res.statusCode = 400;
    res.json({
      status: "Bad",
      code: 400,
      message: "Missing fields",
    });
    res.send();
  } else {
    if (indx !== -1) {
      contacts[indx] = { ...contacts[indx], ...body };
      writeFile(contactPath, JSON.stringify(contacts));
      res.statusCode = 200;
      res.send(contacts[indx]);
    } else {
      res.statusCode = 404;
      res.json({
        status: "Bad",
        code: 404,
        message: "Not found",
      });
      res.send();
    }
  }
});

//================================================Удаление контакта
contactsRouter.delete("/:_id", (req, res) => {
  const { _id } = req.params;

  const indx = contacts.findIndex((item) => item.id === +_id);

  if (indx !== -1) {
    contacts.splice(indx, 1);
    writeFile(contactPath, JSON.stringify(contacts));
    res.json({
      status: "Ok",
      code: 200,
      message: "Contact deleted",
    });
    res.send();
  } else {
    res.statusCode = 404;
    res.json({
      status: "Bad",
      code: 404,
      message: "Not found",
    });
    res.send();
  }
});

module.exports = {
  contactsRouter,
};
