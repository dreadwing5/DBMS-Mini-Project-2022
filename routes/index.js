const express = require("express");
const router = express.Router();
const { snakeCase, startCase } = require("lodash");
const connection = require("../configs/DBConnection");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../configs/auth");

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("index", {
    title: "Home",
    Username: req.user.name,
  });
});

//faculty Page Route
router.get("/search", ensureAuthenticated, (req, res) => {
  const title = startCase(req.params.module); //Send the title of html page
  res.render("fields/search", {
    Username: req.user.name,
    title,
  });
});

router.get("/faculty/:module", ensureAuthenticated, (req, res) => {
  const moduleName = snakeCase(req.params.module); //Dynamically render the page using url params
  const title = startCase(req.params.module); //Send the title of html page
  res.render(`fields/${moduleName}`, {
    title: title,
    Username: req.user.name,
    isInsertMode: true, //This is for checking if we are inserting the data or updating it
  });
});

//404 Page
router.get("/error/404", (req, res) => {
  res.render("404");
});

/* //For later use, where we need to make our own api for image upload
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("file"); */

module.exports = router;
