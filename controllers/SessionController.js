let PersonModel = require("../models/PersonModel.js")
let SessionModel = require("../models/SessionModel.js")

let PersonController = {
  find: async (req, res) => {
    let found = await SessionModel.findOne({name: req.params.name})
    res.json(found)
  },
  create: async (req, res) => {
    // let savedSession = await SessionModel.findOne({ name: req.body.session })

    // if(!savedSession){
    //   savedSession = await SessionModel.create({
    //     name: req.body.session
    //   })
    // }

    // let savedPerson = await PersonModel.create({
    //   name: req.body.name,
    //   session: savedSession._id
    // })

    // await savedSession.people.push(savedPerson)
    // await savedSession.save()

    // savedPerson.session = savedSession
    // await savedPerson.save()

    // res.json(savedPerson)
  },
  all: async (req, res) => {
    let found = await SessionModel.find().populate('people')
    console.log(found)

    res.render("sessions/sessions", { 
      title: "Sessions",
      sessions: found 
    })
  },
  getPeople: async (req, res) => {
    let found = await SessionModel.findOne({name: req.params.name}).populate("people")
    res.json(found)
  },
}

module.exports = PersonController