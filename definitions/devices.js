const { JobHandlers } =  require("../jobs/handlers");

 const deviceDefinitions = (agenda) => {
   agenda.define("sendDeviceData",JobHandlers.sendDeviceData);
};

module.exports = { deviceDefinitions }