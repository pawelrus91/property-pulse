import { Schema, Types, model, models } from "mongoose";
import { Message as TMessage, Override } from "@/types";

type MessageSchema = Override<
  TMessage,
  {
    sender: Types.ObjectId;
    recipient: Types.ObjectId;
    property: Types.ObjectId;
  }
>;

const MessageSchema = new Schema<MessageSchema>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
