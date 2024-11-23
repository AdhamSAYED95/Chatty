import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { LoginData } from "../server";
import { sendEmail, sendInvite } from "./email";
import dotenv from "dotenv";

dotenv.config();

export async function login(data: LoginData) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  await sendEmail(data.email, otp);
  let user = await User.findOne({ email: data.email });

  if (user) {
    user.otp = otp;
    await user.save();
  } else {
    user = await User.create({ email: data.email, otp: otp });
  }
}

export async function verifyOtp(data: LoginData) {
  const email = data.email;
  const otp = data.otp;
  const user = await User.findOne({ email: email, otp: otp });

  if (!user) {
    return false;
  } else {
    const token = jwt.sign({ userId: user._id }, process.env.JWY_SECRET!);

    return token;
  }
}

export function inviteUser(data: any) {
  const invitedUser = data.invitedUser;
  const chatId = data.chatId;

  sendInvite(invitedUser, chatId);
}

export function validateToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWY_SECRET!);
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
}
