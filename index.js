const discord = require("discord.js")
const client = new discord.Client()

const config = require("./config.json")
const command = require("./commands")
var version = "0.6.2 - Alpha";
   
client.on('ready', () =>{
    console.log("This bot is currently online")

    command(client, "hi", (message) =>{
        message.channel.send('hi')
    })
})


client.login(config.token)

