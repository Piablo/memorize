const {Sentences} = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    model (req, res) {
        console.log("SaveSentenceController");
        var sentence = req.body.payload;
        console.log(sentence)
        var bearer = req.body.headers.Authorization.split(" ");
        var token = bearer[1];
        var publicKEY = process.env.JWT_KEY;


        jwt.verify(token, publicKEY, function(err, decoded){
            if(err){
                res.send("Token Expired");
            }
            if(decoded){
                Sentences.create(sentence)
                .then(resp => {
                    res.send(resp);
                })
                .catch(error => {
                    res.send(error);
                })       
            }
        })
    }
}