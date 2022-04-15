module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('You do not have permission to kick members.');
        }
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a valid member of this server');
        }

        const targetMember = message.guild.members.cache.get(member.id);
        targetMember.kick();
        message.channel.send(`${member.user.tag} has been kicked.`);
    }
};