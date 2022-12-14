const { SlashCommandBuilder } = require('discord.js');
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
      await axios.post('https://pixe.la/v1/users', body);
      console.log(member.guild.id);
      const graphBody = {
        id: 'g' + `${member.guild.id}-asakatsu`.substr(-15),
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

      await interaction.reply(`User \`${username}\` is successfully created.`);
    } catch (error) {
      console.error(error.message);
      console.error(body);

      await interaction.reply({
        content: error.message + `\ndetail: ${error.response.data.message}`,
        ephemeral: true,
      });
    }
  },
};
