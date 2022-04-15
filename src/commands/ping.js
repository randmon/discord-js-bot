module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args) {
        if (message.member.roles.cache.has('964518400527331368')) {
            message.reply('pong!');
        } else {
            message.reply('You do not have permission to use this command.');
        }
    }
};