const Discord = require('discord.js');
const config = require('./config.js');
const fs = require('fs');
const Client = require('./client/Client');

const client = new Client();
client.commands = new Discord.Collection();

// Récupère les commandes disponibles du bot qui se trouve dans le fichier ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
console.log(client.commands);

client.once('ready', () => {
    console.log("ready!");
})

client.once('reconnecting', () => {
    console.log("reconnecting");
})

client.once('disconnect', () => {
    console.log("disconnect!");
})

client.on("message", async message => {

    if(message.author.bot || !message.content.startsWith(config.prefix)){
        return;
    }
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    try {
        command.execute(message);
    } catch (err){
        console.log(err);
        await message.reply("Il y a eu une erreur");
    }
})

client.login(config.discord_token);
