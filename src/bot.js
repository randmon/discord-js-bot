require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log('Ready!');
});

client.login(process.env.TOKEN);

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});