const {Cards} = require('../models');
const jwt = require('jsonwebtoken');


module.exports = {
    model (req, res) {

        var bearer = req.body.headers.Authorization.split(" ");
        var token = bearer[1];
        var publicKEY = process.env.JWT_KEY;

        console.log("GetImagesController");
        console.log(token);
        //var Card = req.body.payload;
        //var dateAdded = moment().format('YYYY-MM-D')
        //Card.dateAdded = dateAdded;

        jwt.verify(token, publicKEY, function(err, decoded){
            if(err){
                res.send("Token Expired");
            }
            if(decoded){
                // Cards.create(Card)
                // .then(resp => {
                //     res.send(resp);
                // })
                // .catch(error => {
                //     res.send(error);
                // })       
            }
        })
    }
}
