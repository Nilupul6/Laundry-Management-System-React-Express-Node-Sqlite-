const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

// --- (Optional) Admin Registration ---
// You can use this to create new admins, or just stick with the default one.
exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  User.create(username, hashedPassword, (err, user) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error creating user." });
    } else {
      res
        .status(201)
        .send({ message: "Admin user created successfully!", userId: user.id });
    }
  });
};

// --- Admin Login (Session-Based) ---
exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Compare submitted password with stored hash
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    // *** THIS IS THE KEY CHANGE ***
    // Store the user's ID in the session to log them in
    req.session.userId = user.id;

    // Send a success response (no token needed)
    res.status(200).send({
      id: user.id,
      username: user.username,
      message: "Login successful, session created.",
    });
  });
};

// --- Admin Logout (Session-Based) ---
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Could not log out, please try again." });
    }

    // Clear the cookie from the client
    res.clearCookie("connect.sid");
    res.status(200).send({ message: "Logout successful." });
  });
};
