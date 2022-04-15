module.exports = {
    name: 'clear',
    description: 'Clear messages',
    async execute(message, args) {
        if (message.member.permissions.has(['MANAGE_MESSAGES'])) {
            if (!args[0] || isNaN(args[0]) || args[0] < 1) {
                message.channel.send('Please specify a valid number of messages to delete.');
            } else if (args[0] > 100) {
                message.channel.send('You can only delete up to 100 messages at a time.');
            } else {
                //Wait for messages to be fetched before deleting them
                await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                    message.channel.bulkDelete(messages, true);
                });
            }
        } else {
            message.reply('You do not have permission to use this command.');
        }
    }
};