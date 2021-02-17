const config = require("../config");
const connaissances = require("../interface/connaissances");

module.exports = {
    name: "r",
    description: "Que sais-tu sur objet",
    async execute(message){
        const args = message.content.slice(config.prefix.length).split(/ +/);
        if(args.length < 2){
            message.reply("Syntaxe correcte : " + config.prefix + this.name + " <objet>");
            return;
        }
        const arg = message.content.slice(config.prefix.length + this.name.length + 1);
        message.reply("Vous me demandez ce que je sais sur : " + arg);
        let data = {
            content: arg
        }
        const res = await connaissances.postQuestion(data);
        const reply = res.data;
        if(!reply.ok){
            message.reply("Erreur lors de la récupération de la réponse");
            console.error(res);
            return;
        }
        message.reply("Ma réponse est : " + reply.reply);
    }
}
