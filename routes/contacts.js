const express = require("express");
const contactsRouter = express.Router();
const bodyJSON = express.json();
const shortId = require("shortid");
const { writeFile, returnContact, returnIndx } = require("./contactServise");

//================================================Все контакты
contactsRouter.get("/", (req, res) => {
  res.statusCode = 200;
  res.send(returnContact());
});

//================================================Поиск по имени
contactsRouter.get("/filter", (req, res) => {
  const { name } = req.query;

  const filteredContacts = returnContact().filter((item) =>
    item.name.includes(name)
  );

  if (filteredContacts.length == 0) {
    res.statusCode = 200;
    res.json({
      status: "Fail",
      code: 200,
      message: "Not found",
    });
    res.send();
  } else {
    res.statusCode = 200;
    res.send(filteredContacts);
  }
});

//================================================Контакты по айди
contactsRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const contactById = returnContact().find((item) => item.id === +id);

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
    const updateContact = returnContact();
    updateContact.push(newContact);

    writeFile(JSON.stringify(updateContact));
    const lastEl = updateContact[updateContact.length - 1];
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
  const contacts = returnContact();
  const indx = returnIndx(id);

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
      contacts[indx] = {
        ...contacts[indx],
        ...body,
      };
      writeFile(JSON.stringify(contacts));
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
  const contacts = returnContact();
  const indx = returnIndx(_id);

  if (indx !== -1) {
    contacts.splice(indx, 1);
    writeFile(JSON.stringify(contacts));
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
