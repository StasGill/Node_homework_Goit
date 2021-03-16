const fs = require("fs");
const path = require("path");
const contacts = require("../db/contacts.json");

const contactPath = path.join(__dirname, "../", "db", "contacts.json");

//================================================Запись данных
const writeFile = async (data) => {
  fs.writeFile(contactPath, data, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

//================================================Возвращает контакты
const returnContact = () => {
  const contacts = require("../db/contacts.json");
  return contacts;
};

//================================================Возвращает контакты
const returnIndx = (id) => {
  const contactIndx = contacts.findIndex((item) => item.id === +id);
  return contactIndx;
};

module.exports = {
  writeFile,
  returnContact,
  returnIndx,
};
