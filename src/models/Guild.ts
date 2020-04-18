import { Document, Schema, model } from "mongoose";

export interface IGuild extends Document {
  guildId: string;
  prefix: string;
}

export const guildSchema = new Schema(
  {
    guild: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: false,
    },
  },
  { collection: "prefixes" }
);
const GuildModel = model<IGuild>("guild", guildSchema);

export default GuildModel;
