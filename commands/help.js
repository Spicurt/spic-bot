module.exports = {
    name: 'help',
    description: "A simple help command",
    async run (client, message, args)  {
        message.author.send('This command is unavailable until the open beta :/');
    }
}