# Maintenance commands

## Permissions

### Specific Roles

We want to create some commands that only moderators can use.
First let's create a Mod role in our server. Go to Server Settings > Roles and click **Create Role**

Name it "Mod", enable `Allow anyone to @mention this role` (for now to get the role id, you can turn it off later). Send a message in your server with "\\@Mod" which will give you <@[ID]>

![mod role id](img/mod-role-id.png)

Copy the id. You can now turn off the `Allow anyone to @mention this role` option if you want.

Now let's make it so that only users with the Mod role can use our ping command. In the ping.js file, inside the **execute** method:

```js
if (message.member.roles.cache.has('964518400527331368')) {
    message.reply('pong!');
} else {
    message.reply('You do not have permission to use this command.');
}
```
 - Replace the ID with your own Mod role ID.

Let's test it. I don't currently have the Mod role.
![no permission](img/no-permission.png)

If I give myself the role, it works again!

### Specific Permissions

Maybe you don't want to check by role but rather by permission. Let's make a ban command and check if the user has the permission to ban members.

Let's create a new command file **ban.js**
```js
module.exports = {
    name: 'ban',
    description: 'Bans a user from the server.',
    execute(message, args) {
        if (message.member.permissions.has('BAN_MEMBERS')) {
            message.reply('User banned!');
        } else {
            message.reply('You do not have permission to use this command.');
        }
    }
};
```

 - Add the ban command to the command handler in the **bot.js** file.
 - Since you created this server, you have ban permissions. If you want to test this, you will have to add another user to the server.

![no permission](img/alt-no-permission.png)

---
## Clear messages

In a new command file **clear.js**:

```js
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
                    message.channel.bulkDelete(messages, true); //bulkDelete(message list, filter old?)
                });
            }
        } else {
            message.reply('You do not have permission to use this command.');
        }
    }
};
```

 - Add the clear command to the command handler in the **bot.js** file.
 - Warning: You cannot bulk delete messages older than 14 days. This is an API limitation, and you can only do this manually.

---
## Kick and Ban

Add a new **kick.js** command file:

```js
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
```

 - Add the kick command to the command handler in the **bot.js** file.

![kicked](img/kicked.png)

 - Now copy over the code for kicking over to the **ban** command, and just change `.kick()` to `.ban()` along with the informative messages.