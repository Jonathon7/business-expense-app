require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const { getEmployees, getUser } = require("./controllers/employeeController");
const {
  saveForm,
  deleteForm,
  getReports,
  getAllReports
} = require("./controllers/formController");
const {
  signup,
  login,
  logout,
  adminOnly
} = require("./controllers/loginController");

const app = express();

app.use(json());

app.use(express.static(`${__dirname}/../build`));

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

//login CTRL
app.post("/auth/signup", signup);
app.post("/auth/login", login);
app.get("/auth/user", adminOnly);
app.get("/auth/logout", logout);

//Employee CTRL
app.get("/api/employees", getEmployees);
app.get("/api/user", getUser);

//Form CTR
app.get("/api/reports", getReports);
app.get("/api/newreports", getAllReports);
app.post("/api/form", saveForm);
app.delete("/api/form/:title", deleteForm);

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db), console.log("Database Connected"))
  .catch(err => {
    console.log(err);
  });

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
