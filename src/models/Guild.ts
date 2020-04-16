import { Document, Schema, model } from "mongoose";

interface IGuild extends Document {
    guildId: string
    prefix: string
}

const guildSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        required: true
    }
});
const GuildModel = model<IGuild>("guild", guildSchema);

export default GuildModel;