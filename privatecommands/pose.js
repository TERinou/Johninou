const connaissances = require("../interface/connaissances");
const { PerformanceObserver, performance } = require('perf_hooks');
const config = require('../config.js');

module.exports = {
    name: "pose",
    description: "Pose une question version naturelle",
    async execute(message) {
        let data = {
            content: message.content.toString()
        }
        config.calculations++;
        const t0 = performance.now();
        let res = await connaissances.getQuestion();
        let reply = res.data;
        if(!reply.ok){
            config.calculations--;
            message.reply(reply.message);
            console.log(reply);
            return;
        }
        const t1 = performance.now();
        let questionId = reply.question._id;
        const question = reply.question.content;
        message.reply(question);
        const filter = m => m.author.id === message.author.id;
        await message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
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
            await message.react("👍");
            await message.reply("Merci pour ta réponse :)");
        }).catch(collected => {
            console.error(collected);
            message.reply("Aucune réponse :(");
        })
    }
}
