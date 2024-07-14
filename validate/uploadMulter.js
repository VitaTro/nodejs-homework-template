const path = require("path");
const multer = require("multer");

// тимчачова папка
const tmpDirname = path.join(__dirname, "../tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDirname);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
