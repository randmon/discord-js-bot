module.exports = {
    name: 'ban',
    description: 'Bans a user from the server.',
    execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permission to ban members.');
        }
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a valid member of this server');
        }

        const targetMember = message.guild.members.cache.get(member.id);
        targetMember.ban();
        message.channel.send(`${member.user} has been banned.`);
    }
};