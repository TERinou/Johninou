module.exports = {
    name: 'conversation',
    description: 'Le bot envoie un MP',
    execute(message){
        message.author.send("J'vais te goumer wsh j'ai rien coder pour l'instant")
            .then(res => {
            console.log(`Envoyé le message :\"${res}\" à ${message.author.username}`);
        })
            .catch(console.error);
    }
}
