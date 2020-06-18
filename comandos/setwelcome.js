const Discord = require('discord.js')
const db = require('quick.db')

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Você não é um administrador.`); 
  
  let channel = message.mentions.channels.first()
  
  if(!channel) return message.reply('Mencione o canal')
  
  db.set(`welcome_${message.guild.id}`, channel.id)
  
  message.channel.send(`canal setado em: ${channel}`)
}

exports.help = {
  name: 'setwelcome',
  aliases: []
}