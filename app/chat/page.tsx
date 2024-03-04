"use client";
import React from "react";
import { useChat } from "ai/react";
import { InputForm } from "@/page-components/chat/input-form";
import { AnimatedMessage, Message } from "@/page-components/chat/message";

const initialMessage =
  "Hey there, great to meet you. I’m Pi, your personal AI. \n My goal is to be useful, friendly and fun. Ask me for advice, for answers, or let’s talk about whatever’s on your mind. \n How's your day going?";

const ChatPage: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-full text-xl pb-10 overflow-hidden">
      <div className="flex flex-col w-full h-full px-8 py-4 gap-8 overflow-y-auto">
        <AnimatedMessage content={initialMessage} />
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <InputForm
        handleSubmit={handleSubmit}
        value={input}
        placeholder="Ask me anything!"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ChatPage;
