const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
router.post('/register',(req,res,next) => {
  let newUser = new User({
   name: req.body.name,
   email: req.body.email,
   username: req.body.username,
   password: req.body.password
  });
  User.addUser(newUser, (err,user) => {
    if (err) {
      res.json({success:false, msg:'failed to register user'});
    }else{
      res.json({success:true, msg:'user registered'});
    }
  });
});
router.post('/authenticate',(req,res,next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err,user)=>{
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({success: false, msg:"user not found"});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 604800
        });
        res.json({
          success:true,
          token:'JWT'+token,
          user:{
            id:user._id,
            name:user.name,
            username:user.username,
            email:user.email
          }
        });
      }else{
        return res.json({success: false, msg:"wrong password"});
      }
    });
  })
});
router.get('/profile',(req,res,next) => {
  res.send('profile');
});
module.exports = router;
