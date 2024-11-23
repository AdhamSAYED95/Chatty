import { useEffect, useState } from "react";
import "./App.css";
import useUsernameHook from "./hooks/userNameHook";
import useSocketHook from "./hooks/socketHook";
import SendMessage from "./components/sendMessage";
import Messages from "./components/messages";

import useChatIdHook from "./hooks/chatIdHook";
import useAuthHook from "./hooks/authHook";
import Login from "./components/login";
import SideBar from "./components/sideBar";
import ChatOptions from "./components/chatPrivacy";
import useMessagesHook from "./hooks/messages.Hook";
import Model from "./components/common/model";

export interface Message {
  text: string;
  sender: string;
  chatId: string | null;
}

function App() {
  const chatId = useChatIdHook();
  const [messages, setMessages] = useState<Message[]>([]);
  const sender = useUsernameHook();

  const socket = useSocketHook(chatId);
  useMessagesHook(chatId, setMessages, socket);

  const { isLoggedIn } = useAuthHook(socket);

  useEffect(() => {
    if (socket != null) {
      socket.on("message", (message: Message) => {
        setMessages([...messages, message]);
      });
    }
  }, [socket, messages]);

  return (
    <div>
      {isLoggedIn && (
        <div className="flex h-screen overflow-hidden">
          <SideBar socket={socket} />
          <div className="flex-1">
            <header className="bg-white p-4 text-gray-700">
              <h1 className="text-2xl font-semibold">
                {chatId}
                <ChatOptions chatId={chatId} socket={socket} />
              </h1>
            </header>

            <Messages messages={messages} />

            <SendMessage
              chatId={chatId}
              socket={socket}
              sender={sender}
              messages={messages}
              setMessages={setMessages}
            />
          </div>
        </div>
      )}
      {!isLoggedIn && <Login socket={socket} />}
      <Model />
    </div>
  );
}

export default App;
