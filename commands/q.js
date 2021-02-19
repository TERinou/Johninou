const config = require("../config");
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
        const reply = await calculLong();
        message.reply("Ma question est : " + reply);
        const filter = m => m.author.id === message.author.id;
        await message.channel.awaitMessages(filter,{
            max: 1,
            time: 30000,
            errors:['time']
        }).then(message => {
            message = message.first();
            message.reply("Vous avez répondu : " + message.content);
        }).catch(collected => {
            message.reply("Aucune réponse :(");
        })
    }
}

function calculLong(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('résultat');
        }, 2000);
    })
}
