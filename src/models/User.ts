import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  id: string;
  defaultWeather: string;
}

export const userShema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    defaultWeather: {
      type: String,
      required: false,
    },
  },
  { collection: "user" }
);
const UserModel = model<IUser>("user", userShema);

export default UserModel;
