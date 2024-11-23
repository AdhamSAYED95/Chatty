import NewChat from "./newChat";
import { Socket } from "socket.io-client";
import useChatsOwnerHook from "../hooks/chatsOwnerHook";

interface SideBarProps {
  socket: Socket | null;
}

interface Chat {
  name: string;
  ownerId: string;
  privacy: number;
}

export default function SideBar({ socket }: SideBarProps) {
  const chats = useChatsOwnerHook(socket);

  return (
    <>
      <div className="w-1/4 bg-white border-r border-gray-300">
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chatty</h1>
          <NewChat />
        </header>

        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {chats.map((chat: Chat) => {
            return (
              <div
                key={chat.name}
                className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                  <img
                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <a href={`/?chatId=${chat.name}`}>
                    <h2 className="text-lg font-semibold">
                      {chat.name || "General"}
                    </h2>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
