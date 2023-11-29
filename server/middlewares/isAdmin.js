
const jwt  = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    try {
        const token =  req.headers.authorization; // Assuming token is sent in the "Authorization" header

        const decodeToken =   jwt.verify(token,process.env.SecretKey);

        console.log(decodeToken)

      
    //   Check if the user has the 'admin' role
      if (decodeToken.role !== 'admin') {
        throw new Error();
      }
  
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(403).json({ error: 'Forbidden - Admin access required' });
    }
  };
  
  module.exports = isAdmin;