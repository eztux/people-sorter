const mongoose = require("mongoose")
const {Schema} = mongoose

var SessionSchema = new Schema({
  name: String,
  people: [{
    type: Schema.Types.ObjectId,
    ref: "Person"
  }]
})

module.exports = mongoose.model("Session", SessionSchema)