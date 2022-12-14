const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register to asakatsu'),
  async execute(interaction) {
    const member = interaction.member;
    const username = 'g' + (member.guild.id + 'x' + member.id).substr(-31);
    const body = {
      token: process.env.TOKEN,
      username,
      agreeTermsOfService: 'yes',
      notMinor: 'yes',
    };

    try {
      // Create user account
      await axios.post('https://pixe.la/v1/users', body);

      const graphId = 'g' + `${member.guild.id}-asakatsu`.substr(-15);
      const graphBody = {
        id: graphId,
        name: 'asakatsu',
        unit: 'h',
        type: 'int',
        color: 'ajisai',
        timezone: 'Asia/Tokyo',
      };

      await axios.post(
        `https://pixe.la/v1/users/${username}/graphs`,
        graphBody,
        {
          headers: { 'X-USER-TOKEN': process.env.TOKEN },
        },
      );

      const graphEmbed = new EmbedBuilder()
        .setTitle('Graph')
        .setImage(`https://pixe.la/v1/users/${username}/graphs/${graphId}`);

      await interaction.reply({ embeds: [graphEmbed] });
    } catch (error) {
      console.error(error.message);
      console.error(body);
      let content = error.message;
      if (error.response) content += `\ndetail: ${error.response.data.message}`;

      await interaction.reply({
        content,
        ephemeral: true,
      });
    }
  },
};
