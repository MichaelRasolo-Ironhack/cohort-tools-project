const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;
async function isAuthenticated(req, res, next) {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      res.status(401).json({ message: "Man, provide the token plz !" });
    }
    const token = authHeaders.replace("Bearer ", "");
    const payload = jwt.verify(token, SECRET_TOKEN, { algorithms: ["HS256"] });

    const user = await User.findById(payload._id)
    if (!user) return res.status(401).json({message:"You basically don't exist. There."})
    req.user = user
    next()
  } catch (error) {
    next(error);
  }
}

module.exports = isAuthenticated