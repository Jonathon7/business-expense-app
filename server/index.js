require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const { signup, login } = require("./controllers/loginController");
const { getEmployees } = require("./controllers/employeeController");

const app = express();

app.use(json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  })
);

app.use(express.static(`${__dirname}/../build`));

app.post("/auth/signup", signup);
app.post("/auth/login", login);
app.get("/api/employees", getEmployees);

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db), console.log("Database Connected"))
  .catch(err => {
    console.log(err);
  });

const port = 3002;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
