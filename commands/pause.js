const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "멈춰",
  description: "현재 재생중인 음악을 멈춥니다..",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("현재 재생중인 음악이 없습니다..").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ 음악멈추기`).catch(console.error);
    }
  }
};
