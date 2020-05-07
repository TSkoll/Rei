import { Document, Schema, model } from "mongoose";

export interface ISc extends Document {
  id: string;
  sc: string;
  pp: number;
  rank: number;
}

export const scSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    sc: {
      type: String,
      required: true,
    },
    pp: {
      type: Number,
      required: true,
    },
    rank: {
      type: Number,
      required: false,
    },
  },
  { collection: "sc" }
);
const ScModel = model<ISc>("sc", scSchema);

export default ScModel;
