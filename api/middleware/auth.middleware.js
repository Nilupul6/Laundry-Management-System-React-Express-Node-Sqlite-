const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
    // User is logged in, proceed to the next function
    next();
  } else {
    // User is not logged in
    return res
      .status(401)
      .send({ message: "Unauthorized! You must be logged in." });
  }
};

module.exports = { isLoggedIn };
