import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: String,
  date: Date,
  time: String,
  location: String,
  EventType: String, // e.g., Individulal, Team
  MaxNoOfParticipantsPerTeam: Number,
  description: String,
  status:String,
  category: String,
  pointsConfiguration: [Number] ,// first element is points for first place, second for second place, etc.
  winners:String,
  firstRunnerUp: String,
  secondRunnerUp: String,
  maxTeamsPerBatch: Number,
  

  

});

export default model("eventSchema", eventSchema);
