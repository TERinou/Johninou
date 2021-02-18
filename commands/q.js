const config = require("../config");
const connaissances = require("../interface/connaissances");

module.exports = {
    name: "q",
    description: "Vous voulez que je vous pose une question",
    async execute(message){
        const args = message.content.slice(config.prefix.length).split(/ +/);
        if(args.length !== 1){
            message.reply("Syntaxe correcte : " + config.prefix + this.name);
            return;
        }
        message.reply("Je suis entrain de vous trouver une question");

        const res = await connaissances.getQuestion();
        const reply = res.data;
        if(!reply.ok){
            message.reply("Erreur lors de la récupération du message");
            console.error(reply);
            return;
        }
        const questionId = reply.question._id;
        const question = reply.question.content;
        message.reply("Ma question est : " + question);
        const filter = m => m.author.id === message.author.id;
        await message.channel.awaitMessages(filter,{
            max: 1,
            time: 30000,
            errors:['time']
        }).then(async message => {
            message = message.first();
            const data = {
                content: message.content,
                id: questionId
            }
            const res = await connaissances.postQuestion(data);
            const reply = res.data;
            if(!reply.ok){
                await message.reply("Erreur lors de l'envoi de la réponse");
                console.error(res);
                return;
            }
            await message.reply("Vous avez répondu : " + message.content);
        }).catch(collected => {
            message.reply("Aucune réponse :(");
        })
    }
}
