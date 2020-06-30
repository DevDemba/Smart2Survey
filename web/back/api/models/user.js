require('dotenv').config();
const mongoose = require('mongoose');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const CODE = process.env.CODE;

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "can't be blank"], 
      match: [/\S+@\S+\.\S+/, 'is invalid'], 
      index: true
    },
/*     enabled: { 
      type: Boolean, 
      default: true 
    },
    accountNonLocked: { 
      type: Boolean, 
      default: true 
    },
    accountNonExpired: { 
      type: Boolean, 
      default: true 
    },
    credentialsNonExpired: { 
      type: Boolean, 
      default: true 
    }, */
    hash: String,
    salt: String,
    created_at: { 
      type: Date, 
      default: Date.now 
    },
    updated_at: { 
      type: Date, 
      default: Date.now 
    }
  });


  userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

  userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
  };

  userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  };

  userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      fisrtName: this.firstName,
      exp: parseInt(expiry.getTime() / 1000),
    }, CODE);
  };

const User = mongoose.model('Users', userSchema);

module.exports = User;