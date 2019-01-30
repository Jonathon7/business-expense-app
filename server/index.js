require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const {
  getEmployees,
  getUser,
  addRequestAmount,
  updateAmount,
  saveChanges,
  addPhoto
} = require("./controllers/employeeController");
const {
  saveForm,
  deleteForm,
  getReports,
  getAllReports,
  getUserReport,
  approveReport,
  denyReport,
  getApproved,
  getAllApproved,
  getDenied,
  addImage
} = require("./controllers/formController");
const {
  signup,
  login,
  logout,
  adminOnly,
  join
} = require("./controllers/loginController");
const app = express();
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");

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

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// Define POST route
app.post("/api/upload", (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

//login CTRL
app.post("/auth/signup", signup);
app.post("/auth/login", login);
app.get("/auth/user", adminOnly);
app.get("/auth/logout", logout);

//Employee CTRL
app.get("/api/employees", getEmployees);
app.get("/api/user", getUser);
app.post("/api/request", addRequestAmount);
app.post("/api/user/info", saveChanges);
app.post("/api/photo", addPhoto);
app.put("/api/report/amount", updateAmount);

app.get("/api/join", join);

//Form CTR
app.get("/api/reports", getReports);
app.get("/api/approved", getApproved); //employee
app.get("/api/denied", getDenied);
app.get("/api/report/approved", getAllApproved); //admin
app.get("/api/newreports", getAllReports);
app.get("/api/user/report/:id", getUserReport);
app.post("/api/form", saveForm);
app.put("/api/report/approve/", approveReport);
app.put("/api/report/deny/", denyReport);
app.delete("/api/form/:title", deleteForm);
app.post("/api/image", addImage);

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db), console.log("Database Connected"))
  .catch(err => {
    console.log(err);
  });

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
