const {Cards} = require('../models');
const moment = require('moment');


module.exports = {
    model (req, res) {

        var Card = req.body.payload;
        var dateAdded = moment().format('YYYY-MM-D')
        Card.dateAdded = dateAdded;

        Cards.create(Card)
        .then(resp => {
            res.send(resp);
        })
        .catch(error => {
            res.send(error);
        })
    }
}
