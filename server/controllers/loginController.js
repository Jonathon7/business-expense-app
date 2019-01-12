const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const db = req.app.get("db");

  const employee = await db.get_employee([req.body.username]);
  const existingEmployee = employee[0];
  if (existingEmployee) {
    return res.status(409).json("Username taken");
  } else {
    const hash = await bcrypt.hash(req.body.password, 12);
    let registeredEmployee = await db.add_employee([req.body.username, hash]);
    const user = registeredEmployee[0];
    req.session.user = {
      username: user.username
    };
    return res.status(201).json(req.session.user);
  }
};

const login = async (req, res) => {
  const db = req.app.get("db");

  const findEmployee = await db.get_employee([req.body.username]);
  const employee = findEmployee[0];

  if (!employee) {
    res
      .status(401)
      .json("User not found. Please register as a new user before logging in.");
  } else {
    const isAuthenticated = bcrypt.compareSync(
      req.body.password,
      employee.hash
    );
    if (!isAuthenticated) {
      res.status(403).json("Incorrect username or password");
    } else {
      req.session.user = {
        isAdmin: employee.isAdmin,
        id: employee.employee_id,
        username: employee.username
      };
      res.status(200).json(req.session.user);
    }
  }
};

module.exports = {
  signup,
  login
};
