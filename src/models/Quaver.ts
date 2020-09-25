import { Document, Schema, model } from "mongoose";

export interface Statistic {
  perf: number;
  acc: number;
  grank: number;
  crank: number;
}

export interface IQuaver extends Document {
  id: string;
  q: string;
  pref: string;
  keys4: Statistic;
  keys7: Statistic;
  gainsLastChecked: number;
}

export const quaverSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      index: true,
    },
    sc: {
      type: String,
      required: true,
    },
    pref: {
      type: String,
      required: true,
    },
    keys4: {
      type: {
        perf: Number,
        acc: Number,
        grank: Number,
        crank: Number,
      },
      required: true,
    },
    keys7: {
      type: {
        perf: Number,
        acc: Number,
        grank: Number,
        crank: Number,
      },
      required: true,
    },
    gainsLastChecked: {
      type: Number,
      required: false,
    },
  },
  { collection: "quaver" }
);
const QuaverModel = model<IQuaver>("quaver", quaverSchema);

export default QuaverModel;
