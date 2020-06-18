const { MessageEmbed } = require('discord.js')
const db = require ('quick.db')

exports.run = async (bot, message, args) => {

    let embedDev = new MessageEmbed()
    .setTitle('**MANUTENÇÃO**')
    .setDescription("⚠️**»** Somente os meus desenolvedores podem usar esse comando.")
    .setColor('#36393e')
    .setTimestamp()
    

    let embedDev1 = new MessageEmbed()
    .setTitle("**MANUTENÇÃO**")
    .setDescription("⚠️ **»** É preciso informar o status da manutenção <on/off>")
    .setColor('#36393e')
    .setTimestamp()
    if(!args[0]) return message.channel.send(embedDev1)
  
    
    if (!['577167173852594177'].includes(message.author.id)) {
    return message.channel.send(embedDev)
        .then(msg => msg.delete({ timeout: 10000}))
    
    } else {
      
        if(args[0] === 'off') {
          
            let embedon = new MessageEmbed()
            
            .setTitle('**MANUTENÇÃO**')
            .setDescription('Apartir desse momento a manutenção está **desativada**, todos os meus comandos voltam a funcionar normalmente!')
            .setColor('#36393e')
            .setTimestamp()

            db.set(`manu`, true)
            
            message.channel.send(embedon)

        } else if(args[0] === 'on') {
          
            let embedoff = new MessageEmbed()
            
            .setTitle('**MANUTENÇÃO**')
            .setDescription('Apartir desse momento a manutenção está **ativada**, nenhum comando meu irá responder.')
            .setColor('#36393e')
            .setTimestamp()     
            
            db.set(`manu`, null)

            message.channel.send(embedoff)
        }
    }
}
exports.help = { 
  name: 'manu',
  aliases: ['manutencao, manutenção, m']
}