const argv = require("yargs").argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contact.js");

// listContacts();

const invokeAction = ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(+id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("Unknown action type!");
  }
};

//invokeAction(...argv._);
invokeAction(argv);
