const fs = require("fs"); //Подключение библиотеки для работы с файловой системой
const path = require("path"); //Подключение библиотеки для работы с путями
const shortid = require("shortid");

const contactPath = path.join(__dirname, "db", "contacts.json");

const writeFile = async (contactsPath, data) => {
  fs.writeFile(contactsPath, data, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

const listContacts = async () => {
  fs.readFile(contactPath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    const content = JSON.parse(data);
    console.table(content);
  });
};

function getContactById(contactId) {
  fs.readFile(contactPath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    const content = JSON.parse(data);
    const contactById = content.find((item) => item.id === contactId);
    console.table(contactById);
  });
}

function removeContact(contactId) {
  const filtered = fs.readFile(contactPath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    const content = JSON.parse(data);
    const contactById = content.filter((item) => item.id !== contactId);
    console.table(contactById);
    const stringifiData = JSON.stringify(contactById);
    writeFile(contactPath, stringifiData);
  });
}

function addContact(name, email, phone) {
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  fs.readFile(contactPath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    const content = JSON.parse(data);
    const contactById = content.push(newContact);
    console.table(content);
    const stringifiData = JSON.stringify(content);
    writeFile(contactPath, stringifiData);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
