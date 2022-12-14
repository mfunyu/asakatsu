const { Events } = require('discord.js');
const pixela = require('../helpers/pixela');

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldState, newState) {
    if (
      oldState.member == newState.member &&
      !oldState.channelId &&
      newState.channelId
    ) {
      const now = new Date();
      if (isDuringAsakatsu(now)) {
        const guild = oldState.guild;
        const channel = guild.channels.cache.find(
          (channel) =>
            channel.name === (process.env.CHANNEL_NAME || 'asakatsu-bot'),
        );
        try {
          const yyyyMMdd = now.toISOString().split('T')[0].replaceAll('-', '');
          console.log(yyyyMMdd);
          const response = await pixela.getPixelByDate(
            newState.member,
            yyyyMMdd,
          );
          console.log(response);
        } catch (error) {
          console.error(error.message);
          let content = error.message;
          if (error.response)
            content += `\ndetail: ${error.response.data.message}`;
          await channel.send({
            content,
            ephemeral: true,
          });
        }
      }
    }
  },
};

function isDuringAsakatsu(now) {
  const begin_hour = process.env.BEGIN_HOUR || 9;
  const begin_min = process.env.BEGIN_MIN || 0;
  const end_hour = process.env.END_HOUR || 10;
  const end_min = process.env.END_MIN || 0;
  const interval_min = process.env.INTERVAL_MIN || 30;

  const time = now.getHours() * 60 + now.getMinutes();
  const begin = begin_hour * 60 + begin_min - interval_min;
  const end = end_hour * 60 + end_min + interval_min;

  if (begin < time && time < end) {
    console.log(begin, time, end, process.env.BEGIN_AT);
    return true;
  }
  console.log(begin, time, end, process.env.BEGIN_AT);
  return false;
}
