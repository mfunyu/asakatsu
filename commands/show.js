const { SlashCommandBuilder } = require('discord.js');

const pixela = require('../helpers/pixela');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show')
    .setDescription('Display your graph'),
  async execute(interaction) {
    try {
      const username = pixela.getUsername(interaction.member);
      const graphId = pixela.getGraphId(interaction.member);

      const png = await pixela.getGraphPNG(username, graphId);

      await interaction.reply({ files: [png] });
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
