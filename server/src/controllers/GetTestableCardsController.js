const {Cards} = require('../models');
const jwt = require('jsonwebtoken');


module.exports = {
    model (req, res) {
        var bearer = req.body.headers.Authorization.split(" ");
        var token = bearer[1];

        var elapsedDays = req.body.payload.data.elapsedDays;
        var publicKEY = process.env.JWT_KEY;

        jwt.verify(token, publicKEY, function(err, decoded){
            if(err){
                res.send("Token Expired");
            }
            if(decoded){

                Cards.findAll({
                where: {
                    nextTestDay: {
                        lte: elapsedDays
                    }
                }
                })
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
