const express = require('express');
const User = require('./models/User');
const Dependent = require('./models/Dependent');

const router = express.Router();

router.post('/user-register', async (req,res) => {
  try {
    const body = req.body;
    console.log(req.body);
    const userData = body.resQR_user;
    const user = new User({
      fullName : userData.ownerFullName,
      email: userData.ownerEmailId,
      phone: userData.ownerPhoneNumber,
      dateOfBirth: userData.ownerDateOfBirth,
      bloodGroup: userData.ownerBloodGroup,
      gender: userData.ownerGender,
      vin: userData.ownerVIN
    })
    await user.save();

    const dependentData = userData.dependents;
    dependentData.forEach(async element => {
      const dependent = new Dependent({
        type: element.dependentType,
        fullName: element.dependentFullName,
        email: element.dependentEmailId,
        phone: element.dependentPhoneNumber,
        dateOfBirth: element.dependentDateOfBirth,
        bloodGroup: element.dependentBloodGroup,
        gender: element.dependentGender,
        user: user._id
      })
      await dependent.save();
    });

    res.status(200).send({
      data: user
    })
  } catch(e) {
    res.status(500).send({
      error: 'server error',
      data: null
    })
  }
})

module.exports = router;