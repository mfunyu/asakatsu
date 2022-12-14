const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

exports.embedGraph = function (pngBuffer) {
  const file = new AttachmentBuilder(pngBuffer).setName('graph.jpg');

  const graphEmbed = new EmbedBuilder()
    .setTitle('Graph')
    .setImage('attachment://graph.jpg');

  return { graphEmbed, file };
};
