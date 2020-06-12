const mongoose = require('mongoose');
const UserSchema = require('../models/user');

UserSchema.statics = {
    create : function(data, cb) {
        let user = new this(data);
        user.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

let userSchema = mongoose.model('User', userSchema);

module.exports = userModel;