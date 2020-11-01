const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name: "comic",
    description: "Gives you a meme",
    async run (client, message, args){
        const subReddits = ["comics", "comicstrips",]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`Here's a comic from r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(embed);
    }
}