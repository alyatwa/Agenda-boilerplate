const Agenda = require("agenda");
const { allDefinitions } = require("../definitions");

// establised a connection to our mongoDB database.
const agenda = new Agenda({
db: { 
    address: process.env.mongodb,
    collection: 'agendaColl',
    options: { useUnifiedTopology: true,ssl: true }, 
    },
    processEvery: "40 seconds",
    maxConcurrency: 20,
});

// listen for the ready or error event.
agenda
 .on("ready", function() { agenda.start(); console.log("Agenda started!")})
 .on("error", function() { console.log("Agenda connection error!")});

// define all agenda jobs
allDefinitions(agenda);

// logs all registered jobs 
console.log({ jobs: agenda._definitions });

module.exports = agenda;