import { Document, Schema, model } from "mongoose";

export interface ILog extends Document {
  loglevel: string;
  content: string;
  additional: Object;
}

export const logSchema = new Schema(
  {
    loglevel: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    additional: {
      type: Object,
      required: false,
    },
  },
  { collection: "logs" }
);
const LogModel = model<ILog>("log", logSchema);

export default LogModel;
