import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export default function useAuthHook(socket: Socket | null) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (socket) {
      const handleOtpSuccess = (data: { token: string }) => {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      };
      socket.on("otpSucess", handleOtpSuccess);
      return () => {
        socket.off("otpSucess", handleOtpSuccess);
      };
    }
  }, [socket]);

  return {
    isLoggedIn: token ? true : false,
  };
}
