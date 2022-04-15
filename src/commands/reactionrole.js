module.exports = {
    name: "reactionrole",
    description: "React to a message to get a role",
    async execute(message, args, Discord, client) {
        const channel = '964574471367311430';
        const blueRole = message.guild.roles.cache.find(role => role.name === 'Blue');
        const redRole = message.guild.roles.cache.find(role => role.name === 'Red');
        const blueEmoji = '🔵';
        const redEmoji = '🔴';

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('React to this message to join a team!')
            .setDescription('React with 🔵 for the Blue team or 🔴 for the Red team.');

        let messageEmbed = await message.channel.send({ embeds: [embed] });
        messageEmbed.react(blueEmoji);
        messageEmbed.react(redEmoji);

        client.on('messageReactionAdd', async(reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot || !reaction.message.guild || reaction.message.channel.id !== channel) return;

            if (reaction.emoji.name === blueEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(blueRole);
            } else if (reaction.emoji.name === redEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(redRole);
            } else return;
        });
        client.on('messageReactionRemove', async(reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot || !reaction.message.guild || reaction.message.channel.id !== channel) return;

            if (reaction.emoji.name === blueEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(blueRole);
            } else if (reaction.emoji.name === redEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(redRole);
            } else return;
        });
    }
}