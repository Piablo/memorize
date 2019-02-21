const SaveCardController = require('./controllers/SaveCardController');
const ValidateTokenController = require('./controllers/ValidateTokenController');
const ValidateUsercontroller = require('./controllers/ValidateUsercontroller');

module.exports = (app) => {
    app.post('/api/save-card',
        SaveCardController.model)

    app.post('/api/validate-token', 
        ValidateTokenController.model) 

    app.post('/api/validate-user', 
        ValidateUsercontroller.model) 
}