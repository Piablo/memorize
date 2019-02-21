console.log('Starting server...')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
//const config = require('./config/config')
//const logger = require('./utils/logger');

const app = express()
app.use(morgan('combined'))

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors())

//Pass app into routes to append endpoints
require('./routes')(app)

sequelize.sync()
    .then(() => {
        app.listen(process.env.API_PORT)
        console.log("server started on " + process.env.API_PORT)
    })


// app.listen(process.env.API_PORT)
// logger.info("server started on port: " + process.env.API_PORT)







