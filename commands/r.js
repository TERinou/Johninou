const config = require("../config");
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
        const reply = await calculLong();
        message.reply("Ma réponse est : " + reply);
    }
}

function calculLong(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('résultat');
        }, 2000);
    })
}
