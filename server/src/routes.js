const SaveCardController = require('./controllers/SaveCardController');
const ValidateTokenController = require('./controllers/ValidateTokenController');
const ValidateUsercontroller = require('./controllers/ValidateUsercontroller');
const GetTestableCardsController = require('./controllers/GetTestableCardsController');
const GetImagesController = require('./controllers/GetImagesController');

module.exports = (app) => {
    app.post('/api/save-card',
        SaveCardController.model)

    app.post('/api/validate-token', 
        ValidateTokenController.model) 

    app.post('/api/validate-user', 
        ValidateUsercontroller.model) 

    app.post('/api/get-testable-cards', 
        GetTestableCardsController.model) 

    app.post('/api/get-images', 
        GetImagesController.model) 

        
}