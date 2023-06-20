import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "@/components/layout";

type ChatMessage = {
  message: string;
  isUser: boolean;
};

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const submitMessage = (e: FormEvent) => {
    e.preventDefault();
    setChat((prevChat) => [...prevChat, { message, isUser: true }]);
    setMessage("");
  };

  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Layout offFooter>
      <div className="flex flex-col h-full">
        <div className="chatCont flex-grow overflow-y-auto p-4 flex flex-col">
          {chat.map((chatLine, index) => (
            <div
              key={index}
              className={` p-4 mb-4 ${
                chatLine.isUser
                  ? "bg-blue-500 text-white self-end rounded-chat-question"
                  : "bg-gray-300 self-start rounded-chat-answer"
              } inline-block`}
            >
              {chatLine.message}
            </div>
          ))}
        </div>
        <div className="promptConsole h-24 fixed bottom-0 w-full bg-gray-700 flex items-center justify-center">
          <form
            onSubmit={submitMessage}
            className="w-full max-w-[80%] flex items-center"
          >
            <input
              value={message}
              onChange={onMessageChange}
              className="rounded-full bg-gray-200 flex-grow mr-4 p-2"
              placeholder="메시지를 입력하새우"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-500 text-white p-2"
            >
              제출
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;