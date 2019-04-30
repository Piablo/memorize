const {Users} = require('../models');
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = {
    model (req, res) {
        console.log("LoginController");
        console.log(req.body);
        var enteredDetails = req.body
        var emailAddress = enteredDetails.emailAddress;
        var enteredPassword = enteredDetails.password;
        var isValidPassword = false;
        var token = null;
        var userID = null;
        var dateJoined = null;

        checkExisting(emailAddress)
        .then(dbResponse => {
            userID = dbResponse.userID;
            savedPassword = dbResponse.password;
            isValidPassword = validatePassword(savedPassword, enteredPassword);
            dateJoined = dbResponse.dateJoined;
            elapsedDays = parseFloat(calculateElapsedDays(dateJoined));
        })
        .then(next => {
            var response = null;
            if(isValidPassword){
                token = generateToken(userID, emailAddress, elapsedDays);
                response = token;
            }else{
                response = "Auth failed";
            }
            res.send(response);
        })
    }
}

function calculateElapsedDays(dateJoined){
    var now = moment(new Date()); 
    var duration = moment.duration(now.diff(dateJoined));
    var days = duration.asDays();
    days = days.toString();
    var daysRounded = days.split(".")
    return daysRounded[0];
}

function generateToken(userID, emailAddress, elapsedDays){
    const token = jwt.sign({
        emailAddress: emailAddress,
        userID: userID,
        elapsedDays: elapsedDays
    }, 
    process.env.JWT_KEY,
    {
        expiresIn: "1h"
    })

    return token;
}

function checkExisting(emailAddress){
    var email = emailAddress
    console.log(email)

    return new Promise((resolve, reject) => {
        Users.findAll(
            { where: {
                email: email,
            }
        })
        .then(resp => {
            resolve(resp[0].dataValues);
        })
        .catch(error => {
            reject(error)
        })
    })
}

function validatePassword(savedPassword, enteredPassword){

    var encryptedPassword = encryptPassword(enteredPassword);

    if(savedPassword === encryptedPassword){
        return true;
    }else{
        return false;
    }
}

function encryptPassword(unencryptedPassord){

    var encryptedPassword = unencryptedPassord;

    return encryptedPassword;
}

