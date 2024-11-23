import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

export default function useChatsOwnerHook(socket: Socket | null) {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    if (socket != null) {
      const token = localStorage.getItem("token");
      socket.on("getChats", (chats) => {
        setChats(chats);
      });
      socket.emit("getChats", { token });
    }
  }, [socket]);

  return chats;
}
