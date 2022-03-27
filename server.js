const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const express = require("express");
const app = express();
const connection = require("./configs/DBConnection");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const fs = require("fs");
const path = require("path");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

require("./configs/passport")(passport);

const publicDirectory = path.join(__dirname, "public");

// Setting public directory

app.use(express.static(publicDirectory));

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  console.log("Development Build");

  const liveReloadServer = livereload.createServer();

  liveReloadServer.watch([publicDirectory + "/css", __dirname + "dist"]);

  // ping browser on Express boot, once browser has reconnected and handshaker
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload());
}
app.use("/scripts", express.static(__dirname + "/dist"));

// Set ejs template
app.set("view engine", "ejs");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Express Session

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash

app.use(flash());

//Global Vars

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Create Default admin

connection.query(
  "SELECT mailid FROM faculty WHERE mailid = ?",
  [process.env.ADMIN_MAIL],
  (err, data) => {
    if (err) {
      console.log(err);
    }
    if (!data.length) {
      connection.query("INSERT INTO faculty SET ? ", {
        id: process.env.ADMIN_ID,
        mailid: process.env.ADMIN_MAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
      });
    }
  }
);

// Routes
app.use("/", require("./routes/user"));
app.use("/", require("./routes/index"));
app.use("/", require("./routes/form"));
app.use("/", require("./routes/report"));
app.use("/", require("./routes/admin"));
app.use("/", require("./routes/dropdown"));

// Server Running at port 4000
app.listen("8000", () => {
  console.log("Server Started ... http://localhost:8000");
});
