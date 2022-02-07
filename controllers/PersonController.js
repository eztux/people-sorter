let PersonModel = require("../models/PersonModel.js")
let SessionModel = require("../models/SessionModel.js")

let PersonController = {
  find: async (req, res) => {
    let found = await PersonModel.findOne({name: req.params.name})
    if(found == null)
      found = {}
    res.json(found)
  },
  create: async (req, res) => {
    let savedSession = await SessionModel.findOne({ name: req.body.session })
    
    if(!savedSession){
      savedSession = await SessionModel.create({
        name: req.body.session
      })
    }

    let savedPerson = await PersonModel.create({
      name: req.body.name,
      session: savedSession._id
    })

    await savedSession.people.push(savedPerson)
    await savedSession.save()

    savedPerson.session = savedSession
    await savedPerson.save()

    res.json(savedPerson)
  },
  all: async (req, res) => {
    let found = await PersonModel.find().populate('session')
    // found = []
    console.log(found)

    let timeMinutes = {
      startTime: 8*60 + 30,
      endTime: 16*60 + 30
    }

    res.render("people/people", { 
      title: "People",
      people: found ,
      timeMinutes: timeMinutes
    })
  },
  getSession: async (req, res) => {
    let found = await PersonModel.findOne({name: req.params.name}).populate("session")
    res.json(found.session)
  },
}

module.exports = PersonController