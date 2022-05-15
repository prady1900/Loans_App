var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");

const customerModel = require("../models/customers.model");
/* GET ALL Customers */
router.get("/list", function (req, res, next) {
  customerModel.find(function (err, custListResponse) {
    if (err) {
      res.status(500).json({
        message: "Not Able to create User",
      });
    } else {
      const recCount = custListResponse.length;
      res.status(200).json({
        recordCount: recCount,
        results: custListResponse,
      });
    }
  });
});

/*GET specific user customers*/
router.get("/view", function (req, res, next) {
  const userId = req.query.userId;
  customerModel.findById(userId, (err, custResponse) => {
    if (err) {
      res.status(500).json({
        message: "No user present",
      });
    } else {
      res.status(200).json({
        message: "User Found",
        results: custResponse,
      });
    }
  });
});

/* Create New Customer */
router.post("/add", function (req, res, next) {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;
  const phoneNumber = req.body.phoneNumber;
  const dob = req.body.dob;

  let customerObj = new customerModel({
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    phoneNumber: phoneNumber,
    dob: dob,
  });

  customerObj.save(function (err, customerObj) {
    if (err) {
      res.status(500).json({
        message: "Not Able to create User",
      });
    } else {
      res.status(200).json({
        message: "Able to create User",
        customerDetails: customerObj,
      });
    }
  });
});

/* Update Existing Customer */
router.put("/update", function (req, res, next) {
  const userId = req.body.userId;

  let customerObj = {
    firstName:req.body.firstName,
  lastName : req.body.lastName,
  emailAddress : req.body.emailAddress,
  phoneNumber : req.body.phoneNumber,
  dob : req.body.dob
  };
  customerModel.findByIdAndUpdate(
    userId,
    customerObj,
    function (err, custResponse) {
      if (err) {
        res.status(500).json({
          error: err,
          message: "Not Able to Update",
        });
      } else {
        res.status(200).json({
          message: "User Updated",
          results: custResponse,
        });
      }
    }
  );
});

/* Delete Existing Customer */
router.delete("/delete", function (req, res, next) {
  const userId = req.query.userId;
  customerModel.findByIdAndDelete(userId, (err,delRes) => {
    if (err) {
      res.status(500).json({
        error: err,
        message: "Not Able to delete",
      });
    } else {
      res.status(200).json({
        message: "User Deleted",
        results: delRes,
      });
    }
  });
});

module.exports = router;
