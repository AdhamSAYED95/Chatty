import { Socket } from "socket.io";
import Message from "../models/Message";
import { validateToken } from "../services/user";
import Chat from "../models/Chat";
import { validateDecodedToken } from "./chatSocket";

export async function getMessagesEventHandler(data: any, socket: Socket) {
  const token = data.token;
  const decodedToken = validateToken(token);

  validateDecodedToken(decodedToken);

  const messages = await Message.find({ chatId: data.chatId });

  socket.emit("getMessages", messages);
}

export async function messageEventHandler(
  data: any,
  socket: Socket,
  chats: { [key: string]: Socket[] },
  chatId: string
) {
  const message = data.message;
  const token = data.token;
  const decodedToken = validateToken(token);

  const validDecodedToken = validateDecodedToken(decodedToken);

  console.log(`message : ${message.text}`);
  console.log(`message : ${message.chatId}`);

  const currentChatId = message.chatId;

  await Chat.findOneAndUpdate(
    { name: currentChatId },
    { ownerId: validDecodedToken.userId },
    { upsert: true }
  );

  const name = message.sender;
  await Message.create({
    chatId: currentChatId,
    text: message.text,
    sender: name,
  });

  if (!chats[currentChatId]) return;
  chats[chatId].forEach((s) => {
    if (s === socket) return;
    s.emit("message", message);
  });
}
