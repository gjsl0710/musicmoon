const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "대기열",
  aliases: ["q"],
  description: "대기열을 보여줘요!",
  async execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("❌ 이 서버에서 재생되는 항목이 없어요!");
    try {
      let currentPage = 0;
      const embeds = generateQueueEmbed(message, serverQueue.songs);
      const queueEmbed = await message.channel.send(
        `**Current Page - ${currentPage + 1}/${embeds.length}**`,
        embeds[currentPage]
      );
      await queueEmbed.react("⬅️");
      await queueEmbed.react("⏹");
      await queueEmbed.react("➡️");

      const filter = (reaction, user) =>
        ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
      const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

      collector.on("collect", async (reaction, user) => {
        try {
          if (reaction.emoji.name === "➡️") {
            if (currentPage < embeds.length - 1) {
              currentPage++;
              queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
            }
          } else if (reaction.emoji.name === "⬅️") {
            if (currentPage !== 0) {
              --currentPage;
              queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
            }
          } else {
            collector.stop();
            reaction.message.reactions.removeAll();
          }
          await reaction.users.remove(message.author.id);
        } catch {
          return message.channel.send("**권한이 없어요..**");
        }
      });
    } catch {
      return message.channel.send("**권한이 없어요..**");
    }
  }
};

function generateQueueEmbed(message, queue) {
  const embeds = [];
  let k = 10;
  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;
    const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");
    const embed = new MessageEmbed()
      .setTitle("노래목록\n")
      .setThumbnail(message.guild.iconURL())
      .setColor("#F8AA2A")
      .setDescription(`**Current Song - [${queue[0].title}](${queue[0].url})**\n\n${info}`)
      .setTimestamp();
    embeds.push(embed);
  }
  return embeds;
}
