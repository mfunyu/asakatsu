const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const pixela = require('../helpers/pixela');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register to asakatsu'),
  async execute(interaction) {
    const username = pixela.getUsername(interaction.member);
    const graphId = pixela.getGraphId(interaction.member);

    try {
      await pixela.createAccount(username);
      await pixela.createGraph(graphId, username);

      const graphEmbed = new EmbedBuilder()
        .setTitle('Graph')
        .setImage(`https://pixe.la/v1/users/${username}/graphs/${graphId}`);

      await interaction.reply({ embeds: [graphEmbed] });
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
