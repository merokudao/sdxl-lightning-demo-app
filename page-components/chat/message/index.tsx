import { Message } from "ai/react";
import { FC } from "react";

interface MessageProps {
  message: Message;
}

const Message: FC<MessageProps> = (props: MessageProps) => {
  const { role, content } = props.message;

  return (
    <div
      className={`flex w-fit px-4 py-2 rounded-lg ${
        role === "user" ? "max-w-xl ml-auto bg-slate-800" : "mr-auto"
      }`}
    >
      {content}
    </div>
  );
};

export { Message };
