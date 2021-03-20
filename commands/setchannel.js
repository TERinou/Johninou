const config = require('../config.js');

module.exports = {
    name: 'setchannel',
    description: 'Permet les commandes complexes dans un channel',
    execute(message){
        const args = message.content.slice(config.prefix.length).split(/ +/);
        config.channels.push(message.channel.id.toString());
        message.reply("done");
    }
}
