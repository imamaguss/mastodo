const User = require('../models/user');
const {encrypt} = require('../helpers/encrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

class Controller {
  static signup(req, res) {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: encrypt(req.body.password),
      phone: req.body.phone,
    });
    newUser
      .save()
      .then(user => {
        console.log(user);
        
        res.redirect('http://localhost:8080/login.html');
      })
      .catch(err => {
        res.status(500).json({message: err});
      })
  }

  static signin(req, res) {
    User
      .findOne({
        email: req.body.email,
        password: encrypt(req.body.password)
      })
      .then(user => {
        if(user) {
          const id = user._id;
          jwt.sign({id, 
            name: user.name,
            email: user.email
          }, process.env.SECRET, (err, token) => {
            res.status(200).json({
              message: 'Signin successfully',
              token,
              userId: id,
              name: user.name
            })
          })
        } else {
          res.status(400).json({
            message: `User not found!`
          })
        }
      })
      .catch(err => {
        res.status(500).json({message: err.message});
      })
  }

  static signinFb(req, res) {
    let token = req.body.token;
    let url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`;
    let userData;
    axios({
      method: 'get',
      url,
    })
    .then(userFb => {
      userData = userFb.data;
      return User.findOne({email: userData.email});
    })
    .then(userDb => {
      if(userDb) {
        return userDb;
      } else {
        let newUser = new User({
          name: userData.name,
          email: userData.email
        })
        return newUser.save();
      }
    })
    .then(data => {
      console.log(data);
      
      jwt.sign({
        id: data.id,
        name: data.name,
        email: data.email
      }, process.env.SECRET, (err, token) => {
        res.status(200).json({token, name: data.name});
      })
    })
    .catch(err => {
      res.status(500).json({message: err});
    })
  }

}

module.exports = Controller;