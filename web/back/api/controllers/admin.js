const User = require('./../models/user');

module.exports.getAllUsers = (req, res, next) => {
    // use find() method to return all users
    User.find((err, result) => {
    if(err) { console.log(err) }
    else { res.json(result) }
    })
};

module.exports.getUserID = (req, res, next) => {
    let id = req.params._id;
    // use findOne() method to return user by id
    User.findOne({id:id}, (err, result) => {
    if(err) { console.log(err) }
    else { res.json(result) }
    })
};

module.exports.removeUser = (req, res, next) => {
    // remove user 
    let id = req.params._id
    User.remove({id:id}, (err, result) => {
        if(err) { console.log(err) }
        else { res.json(result) }
    })
};

module.exports.displaySurvey = (req, res, next) => {
    res.send('hello my survey');
};

module.exports.createSurvey = (req, res, next) => {
    res.send('create my Survey');
};

module.exports.getResultats = (req, res, next) => {
    res.send('show results for my survey');
};
