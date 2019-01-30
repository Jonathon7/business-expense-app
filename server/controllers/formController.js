const nodemailer = require("nodemailer");

const saveForm = (req, res) => {
  const db = req.app.get("db");

  db.add_form([
    req.body.username,
    req.body.title,
    req.body.date,
    req.body.expense_type,
    req.body.amount,
    req.body.comments,
    req.body.ispersonal
  ]).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  mailOptions = {
    from: "Business Expense App",
    to: "jonathon.f77@gmail.com",
    subject: "Updated Report",
    text: "Something Happened",
    html: "<b>A report has been submitted!</b>"
  };

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.log("Error", err);
    } else {
      null;
    }
  });
};

const deleteForm = (req, res) => {
  const db = req.app.get("db");

  db.delete_form([req.params.title]).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

const getReports = (req, res) => {
  const db = req.app.get("db");

  db.get_reports([req.session.user.username])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const getAllReports = (req, res) => {
  const db = req.app.get("db");

  db.get_all_reports()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const getUserReport = (req, res) => {
  const db = req.app.get("db");

  db.get_users_report([req.params.id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const approveReport = (req, res) => {
  const db = req.app.get("db");

  // console.log("body", req.body);
  db.approve_report([req.body.reportId, "approved"])
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  let mailOptions = {};

  // console.log("username", req.body.username);
  db.get_email(req.body.username)
    .then(response => {
      // console.log(response[0]);
      mailOptions.to = response[0].email;
    })
    .catch(err => {
      console.log(err);
    });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  // if (mailOptions.to) {
  //   console.log("email check", mailOptions.to);
  mailOptions = {
    from: "Business Expense App",
    to: "jonathon12@hotmail.com",
    subject: "Updated Report",
    text: "Something Happened",
    html: "<b>A report has been updated!</b>"
  };

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.log("Error", err);
    } else {
      null;
    }
  });
  // }
};

const denyReport = (req, res) => {
  const db = req.app.get("db");

  db.deny_report([req.body.reportId, "denied", req.body.denialComments])
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const getApproved = (req, res) => {
  const db = req.app.get("db");

  db.get_approved([req.session.user.username, "approved"])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
    });
};

const getAllApproved = (req, res) => {
  const db = req.app.get("db");

  db.get_all_approved(["approved"])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
    });
};

const getDenied = (req, res) => {
  const db = req.app.get("db");

  db.get_denied(["denied", req.session.user.username])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
    });
};

const addImage = (req, res) => {
  const db = req.app.get("db");

  db.add_image([req.body.image, req.body.title])
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
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
};
