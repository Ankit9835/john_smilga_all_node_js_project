const { unAuthenticatedError } = require("../errors");
const jwt = require('jsonwebtoken');

const login = async (req,res) => {
    const {username,password} = req.body;
   

    if(!username && !password){
        throw new unAuthenticatedError('All Fields are required');
    }

    const id = new Date().getDate();

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      })
    res.status(200).json({msg: 'user created', token});
}

const dashboard = async (req,res) => {
    const number = Math.floor(Math.random()*10);
    res.status(200).json({msg:`hello ${req.user.username}`, secret:`Random number for ${number}`});
    
}

module.exports = {login,dashboard}