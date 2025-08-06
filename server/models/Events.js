import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: String,
  date: Date,
  time: String,
  location: String,
  EventType: String, // e.g., Individulal, Team
  MaxNoOfParticipants: Number,
  description: String,
  status:String,
  category: String,
  pointsConfiguration: [Number] // first element is points for first place, second for second place, etc.
                               
});

export default model("eventSchema", eventSchema);
