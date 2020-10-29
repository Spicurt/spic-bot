//variables
const discord = require("discord.js");
const client = new discord.Client();
const cmdPrefix = "s!";
//const config = require('./config.json');
var version = "0.6.2 - Alpha";
   
client.on('ready', () =>{
    console.log("This bot is currently online");
})


client.login(process.env.botToken);

