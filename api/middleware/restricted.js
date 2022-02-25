const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'daSecret'

module.exports = async (req, res, next) => {
  const token = req.headers.authorization
  console.log('token', token)
  if(token){
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        next({ status: 401, message: "Token invalid" });
      } else {
        req.decodedJwt = decoded;
        next();
      }
    })
    
  } else { 
    next({ status: 401, message: "Token required" });
  
  }
  
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
