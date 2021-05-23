module.exports = {
    name: 'conversation',
    deprecated:true,
    description: 'deprecated',
    execute(message){
        message.author.send("J'vais te goumer wsh j'ai rien coder pour l'instant!")
            .then(res => {
            console.log(`Envoyé le message :\"${res}\" à ${message.author.username}`);
        })
            .catch(console.error);
    }
}
