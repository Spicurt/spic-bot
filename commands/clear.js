const Discord = require('discord.js')

module.exports = {
    name: "clear",
    description: "Clears messages",

    async run (client, message, args) {

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing value')
        .setColor(0xFF0000)
        .setDescription('You are missing some values (ex: s!clear 20)')
        .setTimestamp()

        const amount = args.join(" ");
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have the permissions to use that command.")

        if(!amount) return message.channel.send(noArgs);

        if(amount > 50) return message.reply(`you cannot clear more than 50 messages at once`)

        if(amount < 1) return message.reply(`you need to delete at least one message`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages)
            message.channel.send("Deleted " + amount+" messages")
        });


    

    }
}
