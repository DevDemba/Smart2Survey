const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./../models/user');
const  bcrypt = require("bcryptjs");

module.exports.register = function(req, res) {
    
     //create new user using schema
     let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
  });
  
    newUser.save(function(err) {
      var token;
      token = newUser.generateJwt();
      res.status(200);
      res.json({
        token : token
      });
    });
  };

  module.exports.login = function(req, res) {

    passport.authenticate('local', function(err, user, info){
      var token;
  
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
  
      // If a user is found
      if(user){
        token = newUser.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  
  };