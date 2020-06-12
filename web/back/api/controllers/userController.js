const User = require('./user.dao');

exports.createUser = function (req, res, next) {
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    User.create(user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User created successfully"
        })
    })
}

exports.getUsers = function(req, res, next) {
    User.get({}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            users: users
        })
    })
}

exports.getUser = function(req, res, next) {
    User.get({id: req.params._id}, function(err, user) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            user: user
        })
    })
}

exports.updateUser = function(req, res, next) {
    let user = {
        id: req.body._id,
        description: req.body.description
    }
    User.update({_id: req.params._id}, user, function(err, users) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User updated successfully"
        })
    })
}

exports.removeUser = function(req, res, next) {
    User.delete({id: req.params._id}, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User deleted successfully"
        })
    })
}