const express = require('express');
const router = express.Router();
require('dotenv').config();
const path = require('path');
require('../config/db');
require('../config/passport');
const passport = require('passport');
const jwt = require('express-jwt');
const CODE = process.env.CODE;
const controllerProfile = require('../controllers/profile');
const controllerAuth = require('../controllers/auth');
const controllerAdmin = require('../controllers/admin');
const auth = jwt({ secret: CODE, userProperty: 'payload' });


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


router.get('/admin', (req, res, next) => {
    res.json({
        status: 'API Its Working',
        message: 'My Administrator Page !'
    });
});

router.get('/users', controllerAdmin.getAllUsers);

router.get('/user/profile', auth, controllerProfile.profileRead);

router.post('/user/register', controllerAuth.register);

router.post('/user/login', controllerAuth.login);

//router.get('/admin/user/:id', controllerAdmin.getUserID);

//router.post('/admin/user/remove', controllerAdmin.removeUser);

router.get('/survey/show/:id', controllerAdmin.displaySurvey);
router.get('/survey/show/:id/:question_id', controllerAdmin.show_question);
router.get('/survey/show/:id/:question_id/results', controllerAdmin.getResultatByID);
router.get('/survey/list', controllerAdmin.displaySurveyList);
router.post('/survey/create', controllerAdmin.createSurvey);
router.post('/survey/answer', controllerAdmin.answerSurvey);
router.get('/survey/results',controllerAdmin.getResultats);

module.exports = router;