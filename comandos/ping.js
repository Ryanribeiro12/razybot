const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  var manu = await db.get(`manu`)
  
  if(!manu == true){

  let embedx = new MessageEmbed()

            .setAuthor('Manutenção Ativada!', message.author.avatarURL())
            .setColor('#36393e')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription('A manutenção foi ativada pelos meus desenvolvedores! Todos os comandos estão desativados nesse momento.')
            .addField("Não temos previsão para o termino da manutenção!")
            .addField("Se tiver dúvidas sobre a manutenção entre em nosso discord oficial. [Discord](https://discord.gg/26G9vXk)")
    
   return message.channel.send(embedx)
 }
      const vps = new MessageEmbed()
      const msg = await message.channel.send(vps)
      const api = parseInt(client.ws.ping)


      const ping = new MessageEmbed()
      .setTitle(`**Ping!**`)
      .addField(`**CPU**`, `O delay atual da minha CPU é de: **${Math.floor(msg.createdAt - message.createdAt)}** ms!`)
      .addField(`**API**`, `O delay atual da API do Discord é de: **${api}** ms!`)
      .setTimestamp()
      .setColor('#36393e')
      msg.edit(ping)
}

exports.help = {
  name: 'ping'
}