const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "소리",
  aliases: ["v"],
  description: "현재 재생중인 음악의 크기조정!",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("현재 재생중인음악이 없어요!").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("아무 음성채널에 들어가라구요!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 현재 볼륨: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("숫자만 입력하라구요!").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("0~100 까지 소리를 조절할 수 이써요!").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`볼륨설정!: **${args[0]}%**`).catch(console.error);
  }
};
