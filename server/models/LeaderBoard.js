import { Schema, model } from "mongoose";

const LeaderBoard = new Schema({
  EventName: [String],
  EventId: [String],
  E22Rank: [String],
  E23Rank: [String],
  E24Rank: [String],
  E21Rank: [String],
  E22:[Number],
  E23:[Number],
  E24:[Number],
  E21:[Number],
  E22Points: Number,
  E23Points: Number,
  E24Points: Number,
  E21Points: Number,

  E22Improvement: Number,
  E23Improvement: Number, 
  E24Improvement: Number,
  E21Improvement: Number,

});

export default model("LeaderBoard", LeaderBoard);
