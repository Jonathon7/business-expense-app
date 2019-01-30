const getEmployees = (req, res) => {
  const db = req.app.get("db");
  db.get_employees()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

const getUser = (req, res) => {
  res.status(200).json(req.session.user);
};

const addRequestAmount = (req, res) => {
  const db = req.app.get("db");

  db.add_request_amount([req.session.user.username, req.body.amount])
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
};

const updateAmount = (req, res) => {
  const db = req.app.get("db");

  db.update_amount_received([req.body.username, req.body.amount])
    .then(response => {
      res.status(200);
    })
    .catch(err => {
      console.log(err);
    });
};

const saveChanges = (req, res) => {
  const db = req.app.get("db");

  db.save_changes([req.body.name, req.body.email, req.session.user.username])
    .then(response => {
      res.status(200);
    })
    .catch(err => {
      console.log(err);
    });
};

const addPhoto = (req, res) => {
  const db = req.app.get("db");

  db.add_photo([req.body.photo, req.session.user.username])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getEmployees,
  getUser,
  addRequestAmount,
  updateAmount,
  saveChanges,
  addPhoto
};
