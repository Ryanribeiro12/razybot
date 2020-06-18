const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
    var manu = await db.get(`manu`)
  
    if(!manu == true){

    let embedx = new Discord.MessageEmbed()

            .setAuthor('Manutenção Ativada!', message.author.avatarURL())
            .setColor('#36393e')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription('A manutenção foi ativada pelos meus desenvolvedores! Todos os comandos estão desativados nesse momento.')
            .addField("Não temos previsão para o termino da manutenção!")
            .addField("Se tiver dúvidas sobre a manutenção entre em nosso discord oficial. [Discord](https://discord.gg/26G9vXk)")
      
     return message.channel.send(embedx)
      
    }
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('é preciso ser moderador.')
  
     message.channel.send('Qual a mensagem a ser enviada no servidor?').then(msg => {
       let cp = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
         .on('collect', c => {
             db.set(`servidor_${c.content}`)
              
         })
     })
}

exports.help = {
  name: 'setwm',
  aliases: []
}