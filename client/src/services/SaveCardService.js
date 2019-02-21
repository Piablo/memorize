import Api from '@/services/Api'

export default {
    index (payload) {
        //var token = localStorage.getItem('token');
        //console.log("SavePersonService");
        //console.log(token);

        console.log("SaveCardService");
        console.log(payload);
        return Api().post('/save-card', {payload, 
            //headers: {
             // Authorization: 'Bearer ' + token
            //}
        })
    }
}