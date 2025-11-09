const db = require("../database/database.js");

const User = {};

User.findByUsername = (username, callback) => {
  const sql = "SELECT * FROM user WHERE username = ?";
  db.get(sql, [username], (err, row) => {
    callback(err, row);
  });
};

User.create = (username, hashedPassword, callback) => {
  const sql = "INSERT INTO user (username, password) VALUES (?, ?)";
  db.run(sql, [username, hashedPassword], function (err) {
    callback(err, { id: this.lastID });
  });
};

module.exports = User;
