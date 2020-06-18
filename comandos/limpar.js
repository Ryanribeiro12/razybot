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
    let eb = new MessageEmbed()
    .setColor('#36393e')
    .setTitle("⚠️» **ALGO DE ERRADO**")
    .setDescription("Não escreva nada após o número")

    let eb1 = new MessageEmbed()
    .setColor('#36393e')
    .setTitle("⚠️» **PERMISSÃO**")
    .setDescription("Você não pode fazer isso... \n Permissão necessária: `MANAGE_MESSAGES`")

    let eb2 = new MessageEmbed()
    .setColor('#36393e')
    .setTitle("⚠️» **NÚMERO**")
    .setDescription("Coloque um número entre 1 e 100")


    message.delete()

    let user = message.author;
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(eb1)
    const quantidade = args[0]

    if (quantidade < 1|| quantidade > 100) return message.channel.send(eb2)

        let deleteAmount;

        if(parseInt(quantidade) > 100) {
        deleteAmount = 100;
        } else {
        deleteAmount = parseInt(quantidade)
        }

    message.channel.bulkDelete(deleteAmount, true).then((deleted) => {
        let embed3 = new MessageEmbed()
        .setTitle("🧹 » **LIMPEI**")
        .setDescription(`${deleted.size} mensagens deletadas.`)
        .setFooter(`${message.author.username}`, user.displayAvatarURL())
        .setColor('#36393e')

        message.channel.send(embed3).then(msg => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        })
    })
    
}

exports.help = {
    name: 'limpar'
}