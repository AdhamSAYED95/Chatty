import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export default function useSocketHook(
  chatId: string | null
  // isLoggedIn: boolean
) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => setSocket(io("/", { query: { chatId } })), [chatId]);

  return socket;
}
