const saveForm = (req, res) => {
  const db = req.app.get("db");

  //   const { date, expense_type, amount, comments, isPersonal } = req.body;
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

module.exports = {
  saveForm,
  deleteForm,
  getReports,
  getAllReports
};
