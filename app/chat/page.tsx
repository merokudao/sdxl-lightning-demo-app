"use client";
import React, { FormEvent } from "react";
import { useChat } from "ai/react";
import { InputForm } from "@/page-components/chat/input-form";
import { AnimatedMessage, Message } from "@/page-components/chat/message";
import { useWallet } from "@/components/wallet-provider";

const initialMessage =
  "Hey there, great to meet you. I’m Friday, your personal AI. \n My goal is to be useful, friendly and fun. Ask me for advice, for answers, or let’s talk about whatever’s on your mind. \n How's your day going?";

const ChatPage: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const { executeOperation, canExecuteOperation } = useWallet();

  const submitAndDeduct = (e: FormEvent<HTMLFormElement>) => {
    if (canExecuteOperation()) {
      handleSubmit(e);
      executeOperation();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-full text-lg pb-10 overflow-hidden relative">
      <div className="flex flex-col w-full h-full px-8 py-4 gap-8 overflow-y-auto">
        <div className="h-[15%]" />
        <AnimatedMessage content={initialMessage} />
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <InputForm
        handleSubmit={submitAndDeduct}
        value={input}
        placeholder="Ask me anything!"
        onChange={handleInputChange}
        isLoading={isLoading}
      />
      <div className="flex w-full h-[10%] absolute bg-gradient-to-b to-100% dark:from-zinc-950 from-white to-transparent"></div>
    </div>
  );
};

export default ChatPage;
