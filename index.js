//variables
const discord = require("discord.js");
const bot = new discord.Client();
const cmdPrefix = "s!";
const config = require('./config.json');
var version = "0.6.2 - Alpha";
   
bot.on('ready', () =>{
    console.log("This bot is currently online");
})


bot.login(config.token);

