import Api from '@/services/Api'

export default {
    index (payload) {
        var token = localStorage.getItem('memorizeAppToken');

        return Api().post('/get-sentence', {payload, 
            headers: {
             Authorization: 'Bearer ' + token
            }
        })
    }
}

