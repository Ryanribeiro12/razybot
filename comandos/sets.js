const Discord = require('discord.js')
const db = require('quick.db')

exports.run = (client, message, args) => {
  
   let chx = db.get(`welcome_${message.guild.id}`);
  
   var canal = client.channels.cache.get(chx)
  
   if(chx === null) {
     message.channel.send('nao setado')
   } else {
     message.channel.send(`canal setado em: ${canal}`)
   }
}

exports.help = {
  name: 'sets',
  aliases: []
}