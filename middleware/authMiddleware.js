const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// custom middleware function to verify the token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      message: "Failure",
      payload: " Unable to authorize user",
    });
  }
  //they have the token
  const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.username = tokenData.username;
  next();
};
module.exports = verifyToken;
