const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const User = require("./models/user");
const Product = require("./models/product")

const app = express();
const MONGO_URI = "mongodb://localhost:27017/User";

var store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

// Put this is a middleware directory

const isAuth = (req, res, next) => {
  if (req.session.isLogged) {
    next();
  }
  res.status(302).redirect("/login");
};

const setLocale = (req, res, next) => {
  res.locals.isLogged = req.session.isLogged || false;
  next();
};

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen("3000", () => {
      console.log("Listening to port 3000");
    });
  })
  .catch((err) => {
    console.log("OH NO error");
  });

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));
app.use(flash());

app.use(setLocale);

app.get("/", (req, res) => {
  res.render("home", { user: req.session.user || "Guest" });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup", {
    error: req.flash("message"),
  });
});

app.post("/signup", async (req, res) => {
  const { password, cpassword, firstname, lastname, email } = req.body;

  User.findOne({ email: email }).then(async (user) => {
    if (user) {
      console.log(user);
      req.flash("message", "Email already exixts!");
      return res.redirect("/signup");
    }
    if (password != cpassword) {
      req.flash("message", "Confirm Password does not match!");
      return res.redirect("/signup");
    }

    const epasswd = password;

    const newUser = new User({
      firstname,
      lastname,
      password: epasswd,
      email,
    });
    await newUser.save();
    req.session.isLogged = true;
    res.redirect("/login");
  });
});

app.post("/login", async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  const database = await User.findOne({ email: email });

  if (!database) {
    res.send("NO USER FOUND");
  } else if (database.password != password) {
    res.send("INCORRECT PASSWORD");
  } else {
    req.session.isLogged = true;
    req.session.user = database;
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/mens", async(req, res) => {
  const products = await Product.find({gender:'Men'});
  res.render("men", { user: req.session.user || "Guest", products: products })
});


app.use((req, res) => {
  res.status(404).send("NOT FOUND");
});
