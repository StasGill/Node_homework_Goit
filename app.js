const express = require("express");
const cors = require("cors");
const shortId = require("shortid");
const { contactsRouter } = require("./routes/contacts");

const app = express();

app.use(cors());

app.use("/api/contacts", contactsRouter);

const port = process.env.PORT || 3000;

const contacts = require("./db/contacts");

app.listen(port);
