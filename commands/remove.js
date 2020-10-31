const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "삭제",
  description: "목록에서 음악을 삭제해요!",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Usage: ${message.client.prefix}음악삭제!`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}음악제거!`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ 삭제 **${song[0].title}** 목록에서`);
  }
};
