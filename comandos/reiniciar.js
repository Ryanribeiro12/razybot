const { MessageEmbed } = require('discord.js')

exports.run = async(client, message, args) => {

    if(!['577167173852594177', '389866221295763456'].includes(message.author.id)) {
        return message.reply('permissões insuficientes.')
        .then(msg => {
            msg.delete({ timeout: 30000})
        })
    } else {
    
        let motivo = args.slice(0).join(" ")
        if(!motivo) motivo = 'Sem motivo.'
    
        let embed = new MessageEmbed()
        .setColor('#36393e')
        .setTitle("<:restart:722778583306731601> Restartado")
        .setTimestamp()
        .setThumbnail(client.user.avatarURL())
        .setDescription("<a:ping:721395862571581500> Reiniciado com **" + Math.floor(client.ws.ping) + "** ms")
        .addFields([
            {name: '**Reinicío**', value: `Reinicio sendo realizado.`, inline: true},
            {name: '**Motivo**', value: motivo, inline: true}
        ])
    
        message.channel.send(embed)
        .then(msg => {
            process.exit(1)
        })
    }
}

exports.help = {
    name: 'reiniciar'
} //testa 