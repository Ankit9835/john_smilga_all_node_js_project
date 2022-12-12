const {BadRequestError} = require('../errors')
const testUser = (req,res,next) => {
    if(req.user.testUser){
        throw new BadRequestError('No Permission For Demo User')
    }
    next()
}

module.exports = testUser