const jwt = require('jsonwebtoken');


module.exports = {
    model (req, res) {
        var token = req.body.token;
        console.log("ValidateTokencontroller");
        console.log(token);
        var publicKEY = process.env.JWT_KEY;

        jwt.verify(token, publicKEY, function(err, decoded){
            if(err){
                res.send(false);
            }
            if(decoded){
                res.send(decoded);
            }
        })
        
    }
}
