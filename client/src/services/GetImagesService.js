import Api from '@/services/Api'

export default {
    index (payload) {
        var token = localStorage.getItem('memorizeAppToken');

        return Api().post('/get-images', {payload, 
            headers: {
             Authorization: 'Bearer ' + token
            }
        })
    }
}

