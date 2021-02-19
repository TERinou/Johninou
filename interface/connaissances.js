const axios = require("axios");
const config = require("../config");

module.exports = {
    async getQuestion() {
        return (await axios.get(config.api_url + "/v1/conversations/question").catch(console.error)).data;
    },

    async postQuestion(data) {
        return axios.post(config.api_url + "/v1/conversations/replies", data);
    }
}
