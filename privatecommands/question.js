const connaissances = require("../interface/connaissances");
const { PerformanceObserver, performance } = require('perf_hooks');
const config = require('../config.js');

module.exports = {
    name: "question",
    description: "Question version naturelle",
    async execute(message) {
        let data = {
            content: message.content.toString()
        }
        try {
            message.reply("Laisse moi jusqu'à 1 minute pour trouvé ;)");
            config.calculations++;
            const t0 = performance.now();
            const res = await connaissances.postQuestion(data);
            const reply = res.data;
            if (!reply.ok) {
                config.calculations--;
                message.reply(reply.message);
                console.log(reply);
                return;
            }
            const t1 = performance.now();
            config.calculations--;
            const {inferences} = reply;
            let confirmation;
            if(!inferences) {
                confirmation = "Oui";
            } else {
                confirmation = "Peut-être";
            }

            message.reply(`${confirmation} ! (temps: ${Math.round((t1-t0)/10)/100} secondes)`)
                .then(async (message) => {
                    await message.react("👍");
                    await message.react("👎");

                    const filter = (reaction) => {
                        return (reaction.emoji.name === "👍" || reaction.emoji.name === "👎" );
                    };
                    let tucounter = 0;
                    let tdcounter = 0;
                    const collector = message.createReactionCollector(filter, { time: 60000,dispose:true });
                    collector.on('collect', (reaction, user) => {
                        //console.log(`${user.tag} reacted with ${reaction.emoji.name}`);
                        if(reaction.emoji.name === "👍"){
                            tucounter++;
                        } else if (reaction.emoji.name === "👎"){
                            tdcounter++;
                        }
                    });
                    collector.on("remove",(reaction,user) => {
                        //console.log(`${user.tag} removed ${reaction.emoji.name}`);
                        if(reaction.emoji.name === "👍"){
                            tucounter--;
                        } else if (reaction.emoji.name === "👎"){
                            tdcounter--;
                        }
                    })
                    collector.on("end",(async collected => {
                        for (let i in tucounter) {
                            let data = {
                                content: "oui",
                            }
                        }
                        for(let i in tdcounter){
                            let date = {
                                content: "non",
                            }
                        }

                        message.reactions.removeAll().catch(err => console.error(`Failed to clear reactions #privatecommandes/question.js:${console.trace}`,err));
                    }))
            });

            if (inferences) {
                const path = `${inferences[0].word} > ${inferences.map(inference => `${inference.type}: ${inference.relatedTo}`).join(' > ')}`;
                message.reply(`J'ai trouvé ce résultat en suivant ce chemin : ${path}`);
            }

        } catch (e) {
            console.log(e);
        }
    }
}
