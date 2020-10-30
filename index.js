const discord = require("discord.js")
const client = new discord.Client()

const config = require("./config.json")
const privateMessage = require('./private-message')
const command = require("./commands")
var version = "0.6.2 - Alpha"
   
client.on('ready', () =>{
    console.log("This bot is currently online")
    privateMessage(client, 's!help', "This feature isn't available during the alpha stage.")

    //commands
    command(client, "botInfo", (message) => {
        const InfoEmbed = new discord.MessageEmbed()
        .setTitle("SpicurtBot")
        .setAuthor("made by Spicurt")
        .setColor("#00825f")
        .setDescription("Version " + version)
        .setURL("https://www.youtube.com/channel/UCRSH3MXMWvpdByjfRFLbC3g")
        message.channel.send(InfoEmbed)
    })

    command(client, 'servermembers', (message) => {
       client.guilds.cache.forEach((guild) =>{
           message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`)
       })
    })

   
  
})

client.on('message', msg=>{
    let args = msg.content.substring(config.prefix.length).split(" ")

    switch(args[0]){
        case 'clear':
        if(!args[1]) return msg.channel.send("ERROR: Define a number")
        msg.channel.bulkDelete(args[1])
        msg.channel.send("Deleted "+args[1]+" messages.")
        
        
    break;
    }
    
})


client.login(config.token)

