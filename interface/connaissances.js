const axios = require("axios");
const config = require("../config");

module.exports = {
    async getQuestion() {
        let data = "";
        await axios.get(config.api_url + "/v1/conversations/question",{timeout: 10})
            .then(res => {
                data = res;
            })
            .catch(err => {
                console.error(err);
                if(err.response){
                    console.log(err.response.data);
                    console.log(err.response.status);
                }
                data = err.response;
            })
        return data;
    },

    async postQuestion(data){
        let resultat = "";
        await axios.post(config.api_url + "/v1/conversations/replies",data, {timeout: 10})
            .then(res => {
                resultat = res;
            })
            .catch(err => {
                console.error(err);
                if(err.response){
                    console.log(err.response.data);
                    console.log(err.response.status);
                }
                resultat = err.response;
            });
        return resultat;
    }
}
