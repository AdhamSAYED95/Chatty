import { useEffect } from "react";
import { Message } from "../App";
import { Socket } from "socket.io-client";
import useUsernameHook from "./userNameHook";

export default function useMessagesHook(
  chatId: string | null,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  socket: Socket | null
) {
  const sender = useUsernameHook();
  useEffect(() => {
    if (socket != null) {
      socket.on("getMessages", (messages: Message[]) => {
        console.log(messages);
        setMessages(messages);
      });
      const token = localStorage.getItem("token");
      socket.emit("getMessages", { chatId, token, sender });
    }
  }, [socket]);
}
