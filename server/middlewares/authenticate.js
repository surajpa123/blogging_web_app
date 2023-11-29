
const jwt = require('jsonwebtoken');


const authenticate = (req,res,next)=>{

    try {

    const token =  req.headers.authorization; // Assuming token is sent in the "Authorization" header

    const decodeToken =   jwt.verify(token,process.env.SecretKey);

    req.author = decodeToken.userId



    next()

        
    } catch (error) {
        
        res.send(error)
    }


}

module.exports = authenticate