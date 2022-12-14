const { SlashCommandBuilder } = require('discord.js');
const pixela = require('../helpers/pixela');
const embed = require('../helpers/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register to asakatsu'),
  async execute(interaction) {
    const username = pixela.getUsername(interaction.member);
    const graphId = pixela.getGraphId(interaction.member);

    try {
      await pixela.createAccount(username);
      await pixela.createGraph(username, graphId);

      const response = await embed.showStat(interaction.member);

      await interaction.reply(response);
    } catch (error) {
      console.error(error.message);
      const errorEmbed = embed.errorMessage(error);

      await interaction.reply({
        embeds: [errorEmbed],
        ephemeral: true,
      });
    }
  },
};
