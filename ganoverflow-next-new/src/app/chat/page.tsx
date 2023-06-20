"use client";

import {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
  ReactElement,
} from "react";

type ChatMessage = {
  message: string;
  isUser: boolean;
  isChecked: boolean;
};

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [checkCnt, setCheckCnt] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 제어 ref

  const submitMessage = (e: FormEvent) => {
    e.preventDefault();
    setChat((prevChat) => [
      ...prevChat,
      { message, isUser: true, isChecked: false },
    ]);
    setMessage("");
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // 체크박스 카운트 (for )
  const onCheckboxChange = (index: number) => {
    setChat((prevChat) => {
      const newChat = [...prevChat];
      newChat[index].isChecked = !newChat[index].isChecked;
      return newChat;
    });
    setCheckCnt(
      (prevCheckCnt) => prevCheckCnt + (chat[index].isChecked ? 1 : -1)
    );
  };

  useEffect(() => {
    console.log(checkCnt);
  }, [checkCnt]);

  return (
    <div className="flex flex-col h-full">
      <div className="fixed right-32 bottom-28">
        <BtnSubmitSaveChat checkCnt={checkCnt} />
      </div>
      <div className="chatCont flex-grow overflow-y-auto flex justify-center mb-[96px]">
        <div className="chatBox w-full" ref={scrollRef}>
          {chat.map((chatLine, index) => (
            <div
              key={index}
              className={` w-full py-5 ${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-800" // 홀짝 배경색 변경
              }`}
            >
              <div className="chatPairBox w-2/3 sm:w-1/3 flex flex-col justify-center self-center m-auto">
                <div
                  key={index}
                  className={`msgBox p-4 max-w-sm text-xs ${
                    chatLine.isUser
                      ? "bg-blue-500 text-white self-end rounded-chat-question" //사용자 질문
                      : "bg-gray-500 self-start rounded-chat-answer" //GPT 답변
                  } inline-block`}
                >
                  {chatLine.message}
                </div>
                <div className="msgBox p-4 max-w-sm text-xs bg-gray-500 self-start rounded-chat-answer mt-4">
                  {`답변이요`}
                </div>
                <input
                  type="checkbox"
                  checked={chatLine.isChecked}
                  onChange={() => onCheckboxChange(index)}
                  className="mt-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="promptConsole h-24 fixed bottom-0 w-full flex items-center justify-center dark md:dark:bg-vert-dark-gradient md:bg-vert-light-gradient">
        <form
          onSubmit={submitMessage}
          className="w-full max-w-[40%] flex items-center"
        >
          <input
            value={message}
            onChange={onMessageChange}
            className="rounded-full bg-gray-500 flex-grow mr-4 p-2 text-xs"
            placeholder="메시지를 입력하새우"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-500 text-white p-2 text-xs"
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

const BtnSubmitSaveChat = ({ checkCnt }: { checkCnt: number }) => {
  return (
    <div>
      {checkCnt > 0 ? (
        <button className="rounded-xl border-b-4 border-violet-800 h-14 flex flex-col justify-center opacity-85 ">
          <div className="m-4 flex flex-row">
            <div className="rounded-full w-8 h-7 text-indigo-700 text-sm font-bold bg-violet-700">
              <div className="mt-1 text-white">+{checkCnt}</div>
            </div>
            <div className="mt-1 ml-3 text-sm font-semibold">채팅 저장하기</div>
          </div>
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};