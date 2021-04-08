const path = require("path");
const fs = require("fs").promises;
const multer = require("multer");

const tempFile = path.join(process.cwd(), "temp");

const uploadOptions = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempFile);
  },
  fileName: (req, res, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1200000,
  },
});

const uploadMiddlewar = multer({ storage: uploadOptions });

module.exports = uploadMiddlewar;
