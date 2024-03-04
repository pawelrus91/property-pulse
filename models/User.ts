import { Schema, model, models, Types } from "mongoose";
import { User, Override } from "@/types";

type UserSchema = Override<
  User,
  {
    bookmarks: Types.ObjectId[];
  }
>;

const userSchema = new Schema<UserSchema>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Properties",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = models.User || model("User", userSchema);

export default UserModel;
