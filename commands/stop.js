const { canModifyQueue } = require("../util/EvobotUtil");


module.exports = {
  name: "꺼",
  description: "음악을 꺼요!",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("현재 재생중인 음악이 없어요!").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ 노래를 중지해요!`).catch(console.error);
  }
};
