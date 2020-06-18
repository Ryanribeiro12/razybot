const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`❌ **|** Você precisa ser um moderador para fazer isto!`); 
  
  let channel = message.mentions.channels.first()
  
  if(!channel) return message.reply('⚠️ **|** Por favor mencione o canal a ser setado!')
  
  db.set(`logchannel_${message.guild.id}`, channel.id)
  
  message.channel.send(`✅ **|** Canal de logs setado em: ${channel}`)
  
}

exports.help = {
  name:'setlog',
  aliases: ['setlog']
}