const {Sentences} = require('../models');
const jwt = require('jsonwebtoken');


module.exports = {
    model (req, res) {

        var bearer = req.body.headers.Authorization.split(" ");
        var token = bearer[1];
        var publicKEY = process.env.JWT_KEY;

        console.log("GetSentenceController");
        console.log(token);

        jwt.verify(token, publicKEY, function(err, decoded){
            if(err){
                res.send("Token Expired");
            }
            if(decoded){
                Sentences.findAll()
                .then(resp => {
                    res.send(resp)
                })
                .catch(error => {
                    res.send(error);
                })  
            }
        })
    }
}
