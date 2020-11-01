const Discord = require('discord.js');

const client = new Discord.Client();

const { readdirSync } = require('fs');

const config = require("./config.json");

const { join } = require('path');

const ytdl = require("ytdl-core");

const queue = new Map();

var servers = {};

client.commands= new Discord.Collection();

const prefix = config.prefix;
//You can change the prefix if you like. It doesn't have to be !


const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');
    client.user.setStatus(`online`)
    client.user.setActivity('s!help',{type: "STREAMING"})
});



client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(" ");

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

//MUSIC TEST

client.on('message', message =>{

  let args = message.content.substring(prefix.length).split(" ")

  function play(connection, message){
    var server = servers[message.guild.id]

    server.dispatcher = connection.play(ytdl(server.queue[0],{filter: 'audioonly'}))

    server.queue.shift()

    server.dispatcher.on("end",function(){
      if(server.queue[0]){
        play(connection, message)
      }
      else{
        connection.disconnect()
      }
    })
  }

  switch(args[0]){
    case 'play':
      if(!args[1]) return message.channel.send("You need to provide a link/name!");

      if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel first!")

      if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue : []
      }

      var server = servers[message.guild.id]

      server.queue.push(args[1])

      if(!message.guild.voice.connection) message.member.voice.channel.join().then(function(connection){
        play(connection, message)
      })

    break;


  }

})


client.token = (config.token);
 