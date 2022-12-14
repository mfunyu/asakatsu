const axios = require('axios');
const { convert } = require('convert-svg-to-png');

exports.createAccount = function (username) {
  const body = {
    token: process.env.TOKEN,
    username,
    agreeTermsOfService: 'yes',
    notMinor: 'yes',
  };
  return axios.post('https://pixe.la/v1/users', body);
};

exports.createGraph = function (username, graphId) {
  const graphBody = {
    id: graphId,
    name: 'asakatsu',
    unit: 'h',
    type: 'int',
    color: 'ajisai',
    timezone: 'Asia/Tokyo',
  };

  return axios.post(`https://pixe.la/v1/users/${username}/graphs`, graphBody, {
    headers: { 'X-USER-TOKEN': process.env.TOKEN },
  });
};

exports.getGraphPNG = function (username, graphId) {
  return axios
    .get(
      `https://pixe.la/v1/users/${username}/graphs/${graphId}?mode=short&appearance=dark`,
    )
    .then((svg) =>
      convert(svg.data, {
        height: 180,
        width: 250,
      }),
    );
};

exports.getUsername = function (member) {
  return 'g' + (member.guild.id + 'x' + member.id).substr(-31);
};

exports.getGraphId = function (member) {
  return 'g' + `${member.guild.id}-asakatsu`.substr(-15);
};
