const { deviceDefinitions } =  require("./devices");

const definitions = [deviceDefinitions];

 const allDefinitions = (agenda) => {
  definitions.forEach((definition) => definition(agenda));
};

module.exports = { allDefinitions }