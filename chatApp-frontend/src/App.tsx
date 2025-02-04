import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import MessageBubble from "./MessageBubble";

function App() {
  // Define a TypeScript interface for messages
  interface MessageObject {
    message: string;
    type: "sent" | "received"; // Restrict type to only "sent" or "received"
  }
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<MessageObject[]>([]);
  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && message.length > 0) {
      setAllMessages((prevMessages) => [
        ...prevMessages,
        { message, type: "sent" },
      ]);
      socket.send(message);

      // clearing msg box after sending
      setMessage("");
    }
  };
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    //receiving message
    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
      setAllMessages((prevMessages) => [
        ...prevMessages,
        { message: event.data, type: "received" },
      ]);
    };
    
  }, []);

  return (
    <>
      <div className="w-[35rem] h-[35rem] m-auto border border-rose-800 rounded-lg mt-20 p-5 bg-yellow-400 text-white">
        {/* screen */}
        <div className="w-full h-5/6 border-blue-800 border rounded-lg bg-black flex flex-col p-2 overflow-y-scroll hide-scrollbar">
          {/* message bubble */}
          {allMessages.map((e, i) => (
            <MessageBubble message={e.message} type={e.type} key={i} />
          ))}
        </div>
        {/* button */}
        <div className="flex justify-between space-x-4 mt-9 ">
          <input
            type="text"
            placeholder="type your message"
            className="w-full p-1 px-3 rounded-lg text-black"
            value={message}
            onChange={(e) => onMessageChange(e)}
          />
          <button
            className="px-3 py-1  bg-green-500 rounded-lg hover:bg-green-600"
            onClick={sendMessage}
          >
            send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
