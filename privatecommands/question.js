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
            message.reply(`Oui !`);

            const {inferences} = reply;
            if(inferences) {
                const path = inferences.map(inference => inference.word).join(' > ');
                message.reply(`J'ai trouvé ce résultat en suivant ce chemin : ${path}`);
            }

        } catch (e){
            console.log(e);
        }
    }
}
