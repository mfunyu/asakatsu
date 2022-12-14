const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const pixela = require('../helpers/pixela');
const embed = require('../helpers/embed');

exports.embedGraph = function (pngBuffer) {
  const file = new AttachmentBuilder(pngBuffer).setName('graph.jpg');

  const graphEmbed = new EmbedBuilder().setImage('attachment://graph.jpg');

  return { graphEmbed, file };
};

exports.showStat = async function (member) {
  const username = pixela.getUsername(member);
  const graphId = pixela.getGraphId(member);

  const pngBuffer = await pixela.getGraphPNG(username, graphId);
  const { graphEmbed, file } = embed.embedGraph(pngBuffer);

  const count = 1;

  graphEmbed.setTitle('Asakatsu').setFields(
    {
      name: 'user',
      value: `${member.displayName}`,
      inline: true,
    },
    {
      name: 'streak',
      value: `${count} days`,
      inline: true,
    },
  );
  return { embeds: [graphEmbed], files: [file] };
};

exports.errorMessage = function (error) {
  let value = '\u200B';
  console.log(error.message);

  if (error.response) value = `detail: ${error.response.data.message}`;
  console.log(value);

  const errorEmbed = new EmbedBuilder()
    .setTitle('Error')
    .setColor('0xd8544f')
    .setFields({
      name: error.message,
      value,
    });

  return errorEmbed;
};
