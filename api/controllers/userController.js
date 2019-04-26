const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../../config/secrets');
const passwordHash = require('password-hash');
const validator = require('validator');
const passwordValidator = require('password-validator');

var schema = new passwordValidator();
 
schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits()                                 // Must have digits
  .has().not().spaces()                           // Should not have spaces

exports.user_register = function(req, res) {
  if(!validator.isEmail(req.body.email)){
    res.send('not an email');
    return;
  }
  if(!schema.validate(req.body.password)){
    res.send('password doesn\'t match requirements : length 8-100; upper & lower case letters; contains digits & has no whitespaces.');
    return;
  } 

  var new_user = new User(req.body);
  new_user.password = passwordHash.generate(req.body.password);

  new_user.save(function(err, user){
    if(err) res.send(err);
    res.json(user);
  })
}

exports.user_login = function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    if(err) res.send(err);
    if(!validator.isEmail(req.body.email)) res.send('not an email');
    console.log(user);
    if(user.email === req.body.email && passwordHash.verify(req.body.password, user.password)){
      jwt.sign({user}, config.secrets.jwt_key, {expiresIn: '30 days'}, (err, token) => {
        if(err) res.send(err);
        res.json({token});
      })
    }
    else{
      res.sendStatus(400);
    }
  })
}
