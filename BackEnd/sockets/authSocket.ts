import { Socket } from "socket.io";
import { LoginData } from "../server";
import { login, verifyOtp } from "../services/user";

export async function loginEventHandler(data: LoginData, socket: Socket) {
  await login(data);
  socket.emit("otpSent");
}

export async function otpVerifiedEventHandler(data: LoginData, socket: Socket) {
  const result = await verifyOtp(data);
  if (!result) socket.emit("otpFailed");
  else
    socket.emit("otpSucess", {
      token: result,
    });
}
