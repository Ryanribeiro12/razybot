const Discord = require('discord.js')
const client = new Discord.Client();
const config = require("./config.json");
const db = require('quick.db')
const fs = require('fs')
const http = require('http');
const express = require('express');
const app = express();
client.aliases = new Discord.Collection();

app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);

client.login(process.env.TOKEN);

client.commands = new Discord.Collection();

fs.readdir("./comandos/", (err, files) => {
    if (err) console.error(err);
 
    let arquivojs = files.filter(f => f.split(".").pop() === "js");
    arquivojs.forEach((f, i) => {
        let props = require(`./comandos/${f}`);
        console.log(`Comando ${f} iniciado`)
        client.commands.set(props.help.name, props)
    if(props.help.aliases) props.help.aliases.forEach(alias => client.commands.set(alias, props));
    });

});

client.on('ready', () => {
    console.log(`Fui iniciado com sucesso!`); 
    
    var tabela = [ 

        {name: `${client.guilds.cache.size} servidores`, type: 'PLAYING'}, 
        {name: 'Em caso de violencia domestica disque 180.', type: 'LISTENING'},
        {name: 'O meu desenvolvimento', type: 'WATCHING'},
        {name: 'use r.ajuda para saber mais sobre mim.', type: 'STREAMING', url: 'https://www.twitch.tv/rrsouza12'}
    ];

    function setStatus() {
        
        var altstatus = tabela[Math.floor(Math.random() * tabela.length)]
        client.user.setActivity(altstatus) 
    }

    setStatus();
    setInterval(() => setStatus(), 5000)
  
});

client.on('guildMemberAdd', membro => {
      let chx = db.get(`welcome_${membro.guild.id}`);
  
      if(chx === null){
        return;
      }  
  
    let servidor = db.get(`servidor`)
  
    var canal = client.channels.cache.get(chx)
    
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(``)
    .setDescription(`${servidor}`)
    .setThumbnail(membro.user.displayAvatarURL({dynamic: true}))
    
    canal.send({embed})
})

client.on('message', message => {
    if(message.author.bot) return;
    if(message.channel === "dm") return;
  
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = args.shift()
  
    if (!message.content.startsWith(`${prefix}`)) return;
  
    let arquivocmd = client.commands.get(command.slice(prefix.length));
    if(arquivocmd) arquivocmd.run(client, message, args);
})

client.on("message", message => {
   const { MessageEmbed } = require('discord.js')

   let base_prefix = config.prefix;
   let server_prefix = db.get(`prefix_${message.guild.id}`)
   let prefix;

   if(!server_prefix) prefix = base_prefix
   if(server_prefix) prefix = server_prefix

   let embedHello = new MessageEmbed()
   .setTitle(`<:carinhaestranha:722769464902549505> Salve ${message.author.username},`)
   .setDescription("Vi que você me mencionou, acho que você está com dúvidas se quiser saber alguns dos meus comandos digite `r.ajuda`, ai eu te mando tudo no privado. 😉")
   .setColor('#36393e')

   if(message.author.bot) return;
   if(message.channel.type === "dm") return;
   if(message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) return message.channel.send(embedHello)

   if(!message.content.startsWith(prefix)) return;
   let args = message.content.substring(prefix.length).split(" ");
   let command = args.shift().toLowerCase();

   let erro = new MessageEmbed()
   .setTitle("❌» Error")
   .setDescription("<:procurando:722771012738875472> Ops... Não achei nada, ~~olhei até as pastas que os meus desenvolvedores esconderam rs.~~")
   .setColor('#36393e')

   let arqvCMD = client.commands.get(command)
      if(arqvCMD) {
        if(arqvCMD) arqvCMD.run(client, message, args, prefix);
      } else {
        message.channel.send(`${message.author}`, erro)
      }
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  
    let chx = db.get(`logchannel_${oldMessage.guild.id}`);
   
    if(chx === null){
      return;
    }  
  
   if(oldMessage.author.bot) return;
  
   if(oldMessage.content === newMessage.content) return;
  
   var canal = client.channels.cache.get(chx)
  
   let embed = new Discord.MessageEmbed()
   .setColor('#36393e')
   .setTitle('**MENSAGEM ALTERADA**')
   .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}))
   .setFooter(`made by: Ryan Ribeiro (:)`, client.user.displayAvatarURL({dynamic: true}))
   .addField(`**:pencil: Mensagem alterada por:**`, oldMessage.author)
   .addField(`Canal de texto:`, oldMessage.channel)
   .addField(`**:outbox_tray: Mensagem anterior:**`, `\`\`\`${oldMessage.content}\`\`\``)
   .addField(`**:inbox_tray: Nova mensagem:**`, `\`\`\`${newMessage.content}\`\`\``)
   .setTimestamp()
   
   canal.send({embed})
})

client.on('messageDelete', message => {
  
    let chx = db.get(`logchannel_${message.guild.id}`);
   
    if(chx === null){
      return;
    }  
  
   var canal = client.channels.cache.get(chx)
   
   if(message.author.bot) {
     return;
   } else {
  
   let embed = new Discord.MessageEmbed()
   .setColor('#36393e')
   .setTitle('**MENSAGEM DELETADA**')
   .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
   .setFooter(`made by: Ryan Ribeiro (:)`, client.user.displayAvatarURL({dynamic: true}))
   .addField(`**:pencil: Mensagem deletada por:**`, message.author)
   .addField(`Canal de texto:`, message.channel)
   .addField(`**🗑️ Mensagem deletada:**`, `\`\`\`${message}\`\`\``)
   .setTimestamp()
   
   canal.send({embed})
     
   }
})

client.login(config.token)