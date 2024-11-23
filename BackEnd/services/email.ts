import dotenv from "dotenv";

import { Resend } from "resend";

dotenv.config();

if (!process.env.RESEND_KEY) {
  throw new Error("RESEND_KEY must be defined in the .env file");
}

export function sendEmail(email: any, otp: any) {
  const resend = new Resend(process.env.RESEND_KEY);
  try {
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Email Verification",
      html: `<p>Please use the one-time password ${otp}</p>`,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

export function sendInvite(email: any, otp: any) {
  const resend = new Resend(process.env.RESEND_KEY);
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Invitation to join chat",
    html: `<p>You have been invited to join this chat: ${process.env.PUBLIC_URL}/?chatId=${otp}</p>`,
  });
}
