import { Socket } from "socket.io-client";
import useAppStore from "../store/appStore";

interface chatPrivacypProps {
  socket: Socket | null;
  chatId: string | null;
}

export default function ChatOptions({ socket, chatId }: chatPrivacypProps) {
  const { setModel } = useAppStore();
  const makePrivate = () => {
    const token = localStorage.getItem("token");
    socket?.emit("makePrivate", { chatId, token });
  };

  const inviteUsers = () => {
    const token = localStorage.getItem("token");

    setModel({
      show: true,
      children: (
        <>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Please enter the Invited Person's email address
          </label>
          <input
            type="text"
            id="senderName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="UserName"
            required
          />
        </>
      ),
      onClick: () => {
        const invitedUserInput = document.getElementById(
          "senderName"
        ) as HTMLInputElement;
        const invitedUser = invitedUserInput.value;

        setModel({
          show: false,
        });
        socket?.emit("inviteUsers", { chatId, invitedUser, token });
      },
    });
  };

  return (
    <>
      <button
        type="button"
        className="bg-indigo-600 text-sm text-white px-3 ml-3 rounded-md"
        onClick={makePrivate}
      >
        Make Private
      </button>

      <button
        type="button"
        className="bg-indigo-900 text-sm text-white px-3 ml-3 rounded-md"
        onClick={inviteUsers}
      >
        Invite Friends
      </button>
    </>
  );
}
