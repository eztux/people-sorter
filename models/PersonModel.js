const mongoose = require("mongoose");
const Schema = mongoose.Schema

var PersonSchema = new Schema({
  name: String,
  timesAvailable: [Date],
  session: {
    type: Schema.Types.ObjectId,
    ref: "Session"
  }
})

module.exports = mongoose.model("Person", PersonSchema)