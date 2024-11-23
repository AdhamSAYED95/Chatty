import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import useAppStore from "../store/appStore";

interface LoginProps {
  socket: Socket | null;
}

export default function Login({ socket }: LoginProps) {
  const [email, setEmail] = useState("");

  const { setModel } = useAppStore();

  const login = () => {
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const emailValue = emailElement.value;

    setEmail(emailValue);

    socket?.emit("login", { email: emailValue });
  };

  useEffect(() => {
    if (socket !== null) {
      const handleOtpSent = () => {
        const emailElement = document.getElementById(
          "email"
        ) as HTMLInputElement;
        const emailValue = emailElement.value;

        setModel({
          show: true,
          children: (
            <>
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Please enter the otp sent to your mail
              </label>
              <input
                type="otp"
                id="otp"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="otp"
                required
              />
            </>
          ),
          onClick: () => {
            const otpInput = document.getElementById("otp") as HTMLInputElement;
            const otp = otpInput.value;
            socket?.emit("otpVerified", { otp: otp, email: emailValue });
            setModel({
              show: false,
            });
          },
        });
      };

      socket.on("otpSent", handleOtpSent);
    }
  }, [socket]);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in or Create An Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={login}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
