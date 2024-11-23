import { v4 as uuidv4 } from "uuid";

export default function NewChat() {
  const generateNewChatId = () => {
    const newChatId = uuidv4();
    window.location.href = `/?chatId=${newChatId}`;
  };

  return (
    <>
      <button
        type="button"
        className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
        onClick={generateNewChatId}
        id="send-message"
      >
        NewChat
      </button>
    </>
  );
}
