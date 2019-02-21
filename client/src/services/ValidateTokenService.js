import Api from '@/services/Api'

export default {
    index (payload) {
        return Api().post('/validate-token', payload)
    }
}

