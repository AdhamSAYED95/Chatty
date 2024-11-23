import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    text: String,
    sender: String,
    name: String,
    chatId: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
