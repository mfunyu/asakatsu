const { SlashCommandBuilder } = require('discord.js');

const pixela = require('../helpers/pixela');
const embed = require('../helpers/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show')
    .setDescription('Display your graph'),
  async execute(interaction) {
    try {
      const username = pixela.getUsername(interaction.member);
      const graphId = pixela.getGraphId(interaction.member);

      const pngBuffer = await pixela.getGraphPNG(username, graphId);
      const { graphEmbed, file } = embed.embedGraph(pngBuffer);

      await interaction.reply({ embeds: [graphEmbed], files: [file] });
    } catch (error) {
      console.error(error.message);
      let content = error.message;
      if (error.response) content += `\ndetail: ${error.response.data.message}`;

      await interaction.reply({
        content,
        ephemeral: true,
      });
    }
  },
};
