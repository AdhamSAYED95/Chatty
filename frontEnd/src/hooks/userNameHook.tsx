import { useState, useEffect } from "react";
import useAppStore from "../store/appStore";

export default function useUsernameHook() {
  const [sender, setSender] = useState<string>();

  const { setModel } = useAppStore();

  useEffect(() => {
    const senderName = localStorage.getItem("senderName");

    if (senderName) {
      setSender(senderName);
    } else {
      setModel({
        show: true,
        children: (
          <>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Please enter your name
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
          const senderInput = document.getElementById(
            "senderName"
          ) as HTMLInputElement;
          const senderName = senderInput?.value;

          if (senderName) {
            setSender(senderName);
            localStorage.setItem("senderName", senderName!);
            setModel({
              show: false,
            });
          }
        },
      });
    }
  }, [setModel, sender]);

  return sender;
}
