import { Socket } from "socket.io";
import Chat from "../models/Chat";
import { inviteUser, validateToken } from "../services/user";
import { JwtPayload } from "jsonwebtoken";

export function validateDecodedToken(
  decodedToken: JwtPayload | null
): JwtPayload {
  if (!decodedToken) {
    console.log("Invalid token");
    throw new Error("Invalid token");
  }
  return decodedToken;
}

export async function makePrivateEventHandler(data: any) {
  const token = data.token;

  const decodedToken = validateToken(token);

  const validDecodedToken = validateDecodedToken(decodedToken);

  const chatId = data.chatId;

  await Chat.findOneAndUpdate(
    {
      name: chatId,
      ownerId: validDecodedToken.userId,
    },
    {
      privacy: 1,
    }
  );
}

export async function inviteUsersEventHandler(data: any) {
  const token = data.token;

  const decodedToken = validateToken(token);

  validateDecodedToken(decodedToken);

  inviteUser(data);
}

export async function getChatsEventHandler(data: any, socket: Socket) {
  const token = data.token;
  const decodedToken = validateToken(token);

  const validDecodedToken = validateDecodedToken(decodedToken);

  const chats = await Chat.find({ ownerId: validDecodedToken.userId });

  socket.emit("getChats", chats);
}
