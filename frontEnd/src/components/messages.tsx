import { Message } from "../App";

interface MessagesProps {
  messages: Message[];
}

export default function Messages({ messages }: MessagesProps) {
  return (
    <div className="h-screen overflow-y-auto p-4 pb-36">
      {messages.map((message, index) => {
        return (
          <div key={index} className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-1 shadow-md">
              <p className="text-sm font-bold text-gray-900">
                {message.sender}
              </p>
              <p className="text-gray-700">{message.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// <div className="h-screen overflow-y-auto p-4 pb-36">
//   {/* <!-- Incoming Message --> */}
//   <div className="flex mb-4 cursor-pointer">
//     <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
//       <img
//         src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
//         alt="User Avatar"
//         className="w-8 h-8 rounded-full"
//       />
//     </div>
//     <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
//       <p className="text-gray-700">{message.text}</p>
//     </div>
//   </div>

//   {/* <!-- Outgoing Message --> */}
//   <div className="flex justify-end mb-4 cursor-pointer">
//     <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
//       <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
//     </div>
//     <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
//       <img
//         src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
//         alt="My Avatar"
//         className="w-8 h-8 rounded-full"
//       />
//     </div>
//   </div>
// </div>;
