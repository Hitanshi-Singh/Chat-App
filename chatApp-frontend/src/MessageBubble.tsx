interface MessageBubbleProps {
  message: string;
  type: "sent" | "received"; // Define allowed message types
}
const MessageBubble: React.FC<MessageBubbleProps> = ({ message, type }) => {
  return (
    <div
      className={`${
        type === "received"
          ? `bg-lime-300 self-start`
          : `bg-purple-400 self-end`
      } text-black w-max max-w-md px-3 p-1 rounded-lg my-1`}
    >
      {message}
    </div>
  );
};

export default MessageBubble;
