import { useState } from "react";

export default function useChatIdHook() {
  const urlParams = new URLSearchParams(window.location.search);

  const [chatId, setChatId] = useState<string | null>(urlParams.get("chatId"));

  return chatId;
}
