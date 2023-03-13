const axios = require("axios");

 const JobHandlers = {
    sendDeviceData: async (job, done) => {
      const { data } = job.attrs;
      await axios.post(`${process.env.thingsboard_URL}/api/v1/${data.DeviceToken}/telemetry`,{
      data: data, 
      headers: {"Content-Type":"application/json"}})
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error.toJSON().message);
  })
      done();
    }
};

module.exports = { JobHandlers }