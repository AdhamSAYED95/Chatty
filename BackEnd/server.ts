import { createServer } from "node:http";
import express, { Application } from "express";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";

import dbConnection from "./config/database";

import {
  loginEventHandler,
  otpVerifiedEventHandler,
} from "./sockets/authSocket";
import {
  getChatsEventHandler,
  inviteUsersEventHandler,
  makePrivateEventHandler,
} from "./sockets/chatSocket";

import {
  getMessagesEventHandler,
  messageEventHandler,
} from "./sockets/messageSocket";

dotenv.config();

const app: Application = express();
const server = createServer(app);
const io = new Server(server);

const port: number = process.env.PORT ? Number(process.env.PORT) : 2000;

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}
const MONGODB_URI: string = process.env.MONGODB_URI;

dbConnection(MONGODB_URI);

const chats: { [key: string]: Socket[] } = {};

export interface LoginData {
  email: string;
  otp: number | string;
}

io.on("connection", (socket: Socket) => {
  const chatId = socket.handshake.query.chatId as string;

  socket.on("login", (data: LoginData) => loginEventHandler(data, socket));

  socket.on("otpVerified", (data: LoginData) =>
    otpVerifiedEventHandler(data, socket)
  );

  if (!chats[chatId]) {
    chats[chatId] = [];
  }

  chats[chatId].push(socket);
  console.log(" A user connected");

  socket.on("makePrivate", (data) => makePrivateEventHandler(data));

  socket.on("inviteUsers", (data) => inviteUsersEventHandler(data));

  socket.on("getMessages", (data) => getMessagesEventHandler(data, socket));

  socket.on("getChats", (data) => getChatsEventHandler(data, socket));

  socket.on("message", (data) =>
    messageEventHandler(data, socket, chats, chatId)
  );
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
