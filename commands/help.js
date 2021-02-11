const fs = require('fs');

module.exports = {
    name: "help",
    description: "Décris les commandes du bots",
    execute(message){
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

        let res = commandFiles.forEach((file,i) => {
             let tmp = require(`./${file}`);
             let name = tmp.name;
             let desc = tmp.description;
             message.author.send(`${name}` + " : " + `${desc}`).catch(err => {
                 console.log(err);
             })
        })
    }
}
