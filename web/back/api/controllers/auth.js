const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./../models/user');

module.exports.register = (req, res) => {
  
  // create new user using schema
  let newUser = new User({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  });

  // hash your password
  newUser.setPassword(req.body.password);

  // save user in db
  newUser.save(function(err) {
    var token;
    token = newUser.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
};

module.exports.login = (req, res) => {

  passport.authenticate('local', function(err, user, info) {
    var token;

    // if Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // if a user is found
    if(user){
      token = user.generateJwt();
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