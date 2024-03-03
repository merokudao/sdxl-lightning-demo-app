"use client";
import React from "react";
import { useChat } from "ai/react";
import { InputForm } from "@/page-components/chat/input-form";
import { Message } from "@/page-components/chat/message";

const ChatPage: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col min-w-full w-full h-full text-2xl">
      <div className="flex flex-col w-full h-full px-8 py-4 gap-8 overflow-y-auto">
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
