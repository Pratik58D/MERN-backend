const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  // console.log(token);
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
    return res.status(401).json({ msg: 'Token is not valid' });

    }
    // console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: err.message });
  }
};

module.exports = authMiddleware;