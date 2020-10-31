const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "넘겨",
  aliases: ["s"],
  description: "음악을 넘겨요!",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("현재 재생중인 음악이 없어요!").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ 음악을 넘겼어요!`).catch(console.error);
  }
};
