const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Delete your account from pixela'),
  async execute(interaction) {
    try {
      const member = interaction.member;
      const username = 'g' + (member.guild.id + 'x' + member.id).substr(-31);

      await axios.delete(`https://pixe.la/v1/users/${username}`, {
        headers: { 'X-USER-TOKEN': process.env.TOKEN },
      });

      await interaction.reply(`User \`${username}\` is successfully deleted.`);
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
