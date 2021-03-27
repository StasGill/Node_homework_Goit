const dotenv = require("dotenv");
dotenv.config();
const dbUri = process.env.DB_HOST;
const mongoose = require("mongoose");

const db = mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});

process.on("SIGINT", async () => {
  console.log("Connection for DB closed and app terminated");
  mongoose.connection.close(() => {
    process.exit(1);
  });
});

module.exports = db;
