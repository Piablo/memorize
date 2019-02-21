import Api from '@/services/Api'

export default {
    index (payload) {
        console.log(payload)
        return Api().post('/validate-user', payload)
    }
}

