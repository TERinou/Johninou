const connaissances = require("../interface/connaissances");

module.exports = {
    name: "question",
    description: "Question version naturelle",
    async execute(message){
        let data = {
            content: message.content.toString()
        }
        const res = await connaissances.postQuestion(data);
        const reply = res.data;
        message.reply(reply.word.word)
    }
}
