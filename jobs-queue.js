
const createNewJob = async (jobData) => {
  const job = agenda.create('printAnalyticsReport', jobData);
    job.repeatEvery(jobData.pattern, {
        timezone: jobData.timeZone,
      });
    return await job.save();
}

const updateJob = async (jobData) => {

}

const removeJob = async (jobData) => {

}

module.exports = {createNewJob, updateJob, removeJob}