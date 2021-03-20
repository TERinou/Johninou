const connaissances = require("../interface/connaissances");

module.exports = {
    name: "question",
    description: "Question version naturelle",
    async execute(message){
        let data = {
            content: message.content.toString()
        }
        try{
            const res = await connaissances.postQuestion(data);
            const reply = res.data;
            if(!reply.ok){
                message.reply(reply.message);
                console.log(reply);
                return;
            }
            message.reply(reply.word.word)
        } catch (e){
            console.log(e);
        }
    }
}
