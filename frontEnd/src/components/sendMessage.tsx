import { Socket } from "socket.io-client";
import { Message } from "../App";

interface SendMessageProps {
  sender: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  socket: Socket | null;
  chatId: string | null;
}

export default function SendMessage({
  chatId,
  sender,
  messages,
  setMessages,
  socket,
}: SendMessageProps) {
  const sendMessage = () => {
    const messageElement = document.getElementById(
      "new-message"
    ) as HTMLTextAreaElement | null;
    if (messageElement && messageElement.value.length > 0) {
      const message = messageElement.value;
      messageElement.value = "";

      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender,
        chatId,
        timestamp: new Date().getTime(),
      };
      if (socket) {
        const token = localStorage.getItem("token");
        socket.emit("message", {
          message: newMessage,
          token,
        });
      }

      setMessages([...messages, newMessage]);
    }
  };
  return (
    <>
      <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
        <div className="flex items-center">
          <textarea
            id="new-message"
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          ></textarea>

          <button
            type="button"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
            onClick={sendMessage}
            id="send-message"
          >
            Send
          </button>
        </div>
      </footer>
    </>
  );
}
