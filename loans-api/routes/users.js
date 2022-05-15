var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const { findById } = require('../models/users.model');
const userModel = require("../models/users.model");

/* GET users listing. */

router.get('/list', function(req, res, next) {
  userModel.find((err,userList)=>{
    if (err) {
      res.status(500).json({
        message: "Not Fetch User",
      });
    } else {
      const recCount = userList.length;
      res.status(200).json({
        recordCount: recCount,
        results: userList
      });
    }
  })
});

router.post('/register', function(req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;

  let userObj = new userModel({
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: password
  });

    userObj.save((err,userObj)=>{
      if (err) {
        res.status(500).json({
          message: "Not Able to create User",
        });
      } else {
        res.status(200).json({
          message: "Able to create User",
          userObj: userObj,
        });
      }
    });
});

router.post('/login',(req,res)=>{
  
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;
  
  

  userModel.findOne({emailAddress: emailAddress}, (err, logResponse)=>{
    if(err){
      console.log(err);
    }
    else{
      if(!logResponse){
        res.status(401).json({message:"Invalid email"});
      }
      else{
        async function compareIt(password){
          const validPassword = await bcrypt.compare(password, logResponse.password);
          return validPassword;
        }
       
        if(!compareIt(password)){
          res.status(401).json({message:"Invalid password"});
        }
        else{
          res.status(200).json({message:"Login Successful", userDetails: logResponse});
        }
      }
    }
  });
})

module.exports = router;
