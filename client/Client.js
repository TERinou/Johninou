const {Client, Collection} = require("discord.js");
// On étends la classe client pour avoir des collections supplémentaire et pouvoir stocker la configuration du bot facilement
module.exports = class extends Client {
    constructor(config) {
        super();
        this.commands = new Collection();
        this.privatecommands = new Collection();
        this.config = config;
    }
}
