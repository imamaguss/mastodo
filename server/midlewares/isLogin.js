const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
  isLogin: (req, res, next) => {
    console.log(req.body);
    
    const token = req.headers.token;
    // console.log(token);
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      // console.log(decode);
      
      User
        .findOne({
          id: decode.id,
          email: decode.email
        })
        .then(getUser => {
          // console.log('succes');
          
          next();

        })
        .catch(err => {

        })
    })

  }
};