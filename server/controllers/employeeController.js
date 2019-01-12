const getEmployees = (req, res) => {
  const db = req.app.get("db");

  db.get_employees()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getEmployees
};
