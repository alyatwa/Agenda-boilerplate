const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors');
const Agendash = require("agendash");
const {schedule} = require("./jobs/scheduler");
const agenda = require("./jobs/index");

const app = express();
app.use(bodyParser.json())

var urlencodedParser = bodyParser.urlencoded({ extended: false })
const errorLogger = (error, request, response, next) => {
    console.log( `error ${error.message}`) 
    next(error) // calling next middleware
  }
  const errorHandler = (error, request, response, next) => {
    const status = error.status || 400
    response.status(status).json({
        status: status,
        error: error.message
    })
  }
const hostname = '127.0.0.1';
const port = 4000;
app.use(cors());

app.use("/dash", Agendash(agenda));

app.post("/addjob", (req, res, next) => {
    schedule.createJob(req.body)
    .then(job => 
        res.json({
        status: "ok",
        data:{
            msg: "Job processed successfully!",
            data: job
        }
    }))
    .catch(err => next(err))
});

app.put("/updatejob", (req, res, next) => {
    schedule.updateJob(req.body)
    .then(job => 
        res.json({
        status: "ok",
        data:{
            msg: "Job updated successfully!",
            data: job.attrs
        }
    }))
    .catch(err => next(err))
});

app.put("/pausejob", (req, res, next) => {
    schedule.pauseJob(req.body)
    .then(job => 
        res.json({
        status: "ok",
        data:{
            msg: "Job paused successfully!",
            data: job
        }
    }))
    .catch(err => next(err))
});

app.put("/resumejob", (req, res, next) => {
    schedule.resumeJob(req.body)
    .then(job => 
        res.json({
        status: "ok",
        data:{
            msg: "Job resumed successfully!",
            data: job
        }
    }))
    .catch(err => next(err))
});

app.delete("/removejob", (req, res, next) => {
    schedule.removeJob(req.body)
    .then(job => 
        res.json({
        status: "ok",
        data:{
            msg: "Job removed successfully!",
            //jobID: job.id,
            data: job
        }
    }))
    .catch(err => next(err))
});

app.post("/getuserjobs", (req, res, next) => {
    schedule.getUserJobs(req.body)
    .then(jobs => 
        res.json({
        status: "ok",
        data: jobs
    }))
    .catch(err => next(err))
});

app.delete("/removealljobs", (req, res, next) => {
    schedule.removeAllJobs()
    .then(jobs => 
        res.json({
        status: "ok",
        msg: "All jobs removed",
        data: jobs
    }))
    .catch(err => next(err))
});



app.get('/', function (req, res) {
    res.send('GET request to homepage')
  })

app.use(errorLogger)
app.use(errorHandler)
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});