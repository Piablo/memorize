import axios from 'axios';

export default () => {

    var apiPort = 8088;

    var mode = process.env.NODE_ENV;
    var windowURLHostName = window.location.hostname;

    if(mode === 'development'){

        windowURLHostName = 'http://' + windowURLHostName + ':' + apiPort + '/api'
    }else if(mode === 'production'){
        windowURLHostName = 'https://' + windowURLHostName + '/api'
    }
    return axios.create({
        baseURL: windowURLHostName,
        //baseURL: 'https://register.fab180.co.za/api'
    })
}