const agenda = require("./index");
var ObjectId = require('mongoose').Types.ObjectId;

const schedule = {
  createJob: async (jobData) => {
    const job = agenda.create('sendDeviceData', jobData);
    job.repeatEvery(jobData.pattern, {
        timezone: jobData.timeZone
      }).enable();
    return await job.save().catch((err)=>{
      throw new Error(err)
    })
  },

  updateJob: async (jobData) => {
        await agenda.jobs({_id : ObjectId(jobData.jobID)}).then((jobs)=>{
          if (jobs.length == 0)
          throw new Error("No job with this ID!")
        }).catch(
          (err) => {
            throw new Error(err)
          }
        );

        const job = agenda
        .create("sendDeviceData", jobData)
        .repeatEvery(jobData.pattern, {
          timezone: jobData.timeZone
        })
        .unique({ _id : ObjectId(jobData.jobID) })
        if (jobData.disabled){
          job.disable();
        }else{
          job.enable();
        }
       return await job.save().catch((err)=>{
          throw new Error(err)
        })
  },

  removeAllJobs: async () => {
    try {
      var jobs = await agenda.cancel({ name: "sendDeviceData" });
      if (jobs >= 1)
      return jobs
      else {
        throw new Error("No jobs found!")
      }
    } catch (err) {
      throw new Error(err)
    }
  },

  removeJob: async (jobData) => {
    return await agenda.cancel({ _id : ObjectId(jobData.jobID)}).then((job)=>{
      if (job == 0)
       {
        throw new Error("No job with this ID!")
      }
    }).catch((err)=>{
      throw new Error(err)
    })
  },

  getUserJobs: async (userData) => {
    return await agenda.jobs({'data.userID': userData.userID}).catch(
      (err) => {
        throw new Error(err)
      }
    );
  },

  resumeJob: async (jobData) => {
    return await agenda.enable({ _id : ObjectId(jobData.jobID)}).then((job)=>{
      if (job == 0)
      {
       throw new Error("No job with this ID!")
     }else {
      console.log("job enabled ", job)
     }
    }).catch(
      (err) => {
        throw new Error(err)
      }
    );
  },

  pauseJob: async (jobData) => {
    return await agenda.disable({ _id : ObjectId(jobData.jobID)}).then((job)=>{
      if (job == 0)
      {
       throw new Error("No job with this ID!")
     }else {
      console.log("job disabled ", job)
     }
    }).catch(
      (err) => {
        throw new Error(err)
      }
    );
  }

}

module.exports = { schedule }