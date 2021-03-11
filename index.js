const fs = require("fs"); //Подключение библиотеки для работы с файловой системой
const path = require("path"); //Подключение библиотеки для работы с путями
const shortid = require("shortid");

const contactPath = path.join(__dirname, "db", "contacts.json");
const contactPathWrite = path.join(__dirname, "db", "contactss.json");
console.log(contactPathWrite);

const writeFile = async (contactsPath, data) => {
  fs.appendFile(contactsPath, data, function (err) {
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

    // writeFile(contactPathWrite, stringifiData);
  });
}
removeContact(9);

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
  });
}
