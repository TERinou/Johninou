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

const privateCommandFiles = fs.readdirSync('./privatecommands').filter(file => file.endsWith(".js"));
for (const file of privateCommandFiles){
    const privateCommand = require(`./privatecommands/${file}`);
    client.privatecommands.set(privateCommand.name, privateCommand);
}
console.log(client.commands);
console.log(client.privatecommands);

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
        if(config.channels.indexOf(message.channel.id.toString()) >= 0 && !message.author.bot){
            if(message.content.endsWith("?")){
                let pcommandName = "question";
                let pcommand = client.privatecommands.get(pcommandName);
                pcommand.execute(message);
            } else {
                // let pcommandName = "autre";
                // let pcommand = client.privatecommands.get(pcommandName);
                // pcommand.execute(message);
            }
        }
        return;
    }
    let args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    try {
        await command.execute(message);
    } catch (err){
        console.log(err);
        await message.reply("Il y a eu une erreur");
    }
})

client.login(config.discord_token);
