const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { convert } = require('convert-svg-to-png');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show')
    .setDescription('Display your graph'),
  async execute(interaction) {
    try {
      const member = interaction.member;
      const username = 'g' + (member.guild.id + 'x' + member.id).substr(-31);
      const graphId = 'g' + `${member.guild.id}-asakatsu`.substr(-15);

      const svg = await axios.get(
        `https://pixe.la/v1/users/${username}/graphs/${graphId}?mode=short&appearance=dark`,
      );
      const png = await convert(svg.data, {
        height: 1000,
        width: 5000,
      });

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
