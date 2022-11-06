const { BadRequestError } = require("../errors");
const jwt = require('jsonwebtoken');


const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new BadRequestError('No token provided');
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const{id,username} = decoded;
        req.user = decoded
        next()
    } catch(err){
        throw new BadRequestError('Not authorized access to this token');
    }
}

module.exports = authMiddleware;