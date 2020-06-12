const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user');
require('../config/db');
require('../config/passport');
const passport = require('passport');
const secret = require('../config/secret').secret;
const ctrlProfile = require('../controllers/profile');
const controller = require('../controllers/auth');


var jwt = require('express-jwt');
var auth = jwt({
  secret: secret,
  userProperty: 'payload'
});

router.use(passport.initialize());

router.get('/', (req, res, next) => {    
    
    res.sendFile(path.join(__dirname + '/../../index.html'));
 
});

router.get('/home', (req, res, next) => {
    res.json({
        status: 'API Its Working',
        message: 'My Home'
    });
});

router.get('/users', (req, res, next) => {
    // use find() method to return all users
    User.find((err, result) => {
    if(err) { console.log(err) }
    else { res.json(result) }
    })
});

router.get('/user/:id', (req, res, next) => {
    let id = req.params._id;
    // use findOne() method to return user by id
    User.findOne({id:id}, (err, result) => {
    if(err) { console.log(err) }
    else { res.json(result) }
    })
});

router.get('/data', (req, res, next) => {
    res.json({
        status: 'API Its Working',
        message: 'All data you need for Survey.'
    });
});

router.get('/admin', (req, res, next) => {
    res.json({
        status: 'API Its Working',
        message: 'My Administrator Page !'
    });
});

router.get('/profile', auth, ctrlProfile.profileRead);

router.post('/user/register', controller.register);
/* router.post('/user/register', (req, res, next) => {

    //create new user using schema
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    
    
    //save new user to db
    newUser.save((err, result) => {
        if (err) { console.log(err) }
        else { 
            let token;
            token = User.generateJwt();
            res.status(200);
            res.json(result, {
                "token" : token
              }) 
        }
    });
}); */

router.post('/user/login', controller.login)

/* router.post('/user/login', (req, res, next) => {
    //connect user using schema
    let login = new User({
        email: req.body.email,
        password: req.body.password
    });
    console.log('hello equals not')

    //check user to db
    login.equals((err, result) => {
        console.log('hello equals')
        if (err) { console.log(err) }
        else { res.json(result) }
    });

    
}); */

router.post('/user/remove', (req, res, next) => {
    // remove user 
    let id = req.params._id
    User.remove({id:id}, (err, result) => {
        if(err) { console.log(err) }
        else { res.json(result) }
    })
});

module.exports = router;