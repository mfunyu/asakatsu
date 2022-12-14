const { SlashCommandBuilder } = require('discord.js');
const embed = require('../helpers/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show')
    .setDescription('Display your graph'),
  async execute(interaction) {
    try {
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
