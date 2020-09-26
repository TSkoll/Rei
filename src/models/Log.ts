import { Document, model, Schema } from "mongoose";

export interface ILog extends Document {
  id: string;
  loglevel: string;
  content: string;
  additional: Object;
}

export const logSchema = new Schema(
  {
    loglevel: {
      id: String,
      type: String,
      required: true,
      index: true,
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
