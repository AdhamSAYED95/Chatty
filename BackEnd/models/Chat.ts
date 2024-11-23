import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    name: String,
    ownerId: String,
    privacy: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
