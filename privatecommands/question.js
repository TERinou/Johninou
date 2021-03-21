const connaissances = require("../interface/connaissances");
const { PerformanceObserver, performance } = require('perf_hooks');

module.exports = {
    name: "question",
    description: "Question version naturelle",
    async execute(message) {
        let data = {
            content: message.content.toString()
        }
        try {
            message.reply("Laisse moi jusqu'à 1 minute pour trouvé ;)")
            const t0 = performance.now();
            const res = await connaissances.postQuestion(data);
            const reply = res.data;
            if (!reply.ok) {
                message.reply(reply.message);
                console.log(reply);
                return;
            }
            const t1 = performance.now()
            message.reply(`Oui ! (temps: ${Math.round((t1-t0)/10)/100} secondes)`);

            const {inferences} = reply;
            if (inferences) {
                const path = `${inferences[0].word} > ${inferences.map(inference => `${inference.type}: ${inference.relatedTo}`).join(' > ')}`;
                message.reply(`J'ai trouvé ce résultat en suivant ce chemin : ${path}`);
            }

        } catch (e) {
            console.log(e);
        }
    }
}
