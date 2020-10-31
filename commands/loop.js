const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "반복",
  aliases: ['ㅂ'],
  description: "음악을 반복합니다",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("현재 재생중인 음악이 없습니다!").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`반복을시작합니다.. ${queue.loop ? "**on**" : "**off**"}`)
      .catch(console.error);
  }
};
