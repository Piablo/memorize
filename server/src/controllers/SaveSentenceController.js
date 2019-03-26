const {Sentences, Cards} = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    model (req, res) {
        console.log("SaveSentenceController");
        var sentence = req.body.payload.sentence;
        console.log(sentence)
        var bearer = req.body.headers.Authorization.split(" ");
        var token = bearer[1];
        var publicKEY = process.env.JWT_KEY;




        jwt.verify(token, publicKEY, function(err, decoded){
            if(err){
                res.send("Token Expired");
            }
            if(decoded){

                var listLength = sentence.length;
                var newWords = [];

                for(var i = 0; i < listLength; i++){
                    var word = sentence[i];
                    Cards.findAll({
                        where: {
                            questionText: word
                        }
                    })
                    .then(resp => {
                        console.log(resp.length)
                        if(resp.length === 0){
                            console.log("Yo yo yo ")
                            console.log(word)
                            newWords.push(word);
                        }
                    })
                    
                }
                console.log("This guy")
                console.log(newWords);
                // Sentences.create(sentence)
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