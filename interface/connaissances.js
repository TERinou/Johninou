const axios = require("axios");
const config = require("../config");

module.exports = {
    async getQuestion() {
        let data = "";
        await axios.get(config.api_link + "/v1/conversations/question")
            .then(res => {
                data = res;
            })
            .catch(err => {
                console.error(err);
            })
        return data;
    },

    async postQuestion(data){
        let resultat = "";
        await axios.post(config.api_link + "/v1/conversations/replies",data)
            .then(res => {
                resultat = res;
            })
            .catch(err => {
                console.error(err);
            })

        return resultat;
    }
}
