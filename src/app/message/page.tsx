"use client";
import { useState } from "react";
import styles from "./message.module.scss";
import { MessageBubble } from "./components/MessageBubble";
import { MessageInput } from "./components/MessageInput";
import { DateLocationCard } from "./components/DateLocationCard";

type Message = {
  id: string;
  text: string;
  sender: "user" | "other";
  senderName: string;
  timestamp: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    text: "いまどこにいる？",
    sender: "user",
    senderName: "alueo",
    timestamp: "today, 3:55pm",
  },
  {
    id: "2",
    text: "今、名古屋駅だよ！",
    sender: "other",
    senderName: "sadfad",
    timestamp: "today, 3:55pm",
  },
  {
    id: "3",
    text: "夜ご飯何食べようか？",
    sender: "other",
    senderName: "sadfad",
    timestamp: "today, 3:55pm",
  },
];

export default function MessagePage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      senderName: "alueo",
      timestamp:
        "today, " +
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) +
        "pm",
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.messageArea}>
        <DateLocationCard date="6月8日" location="joyjoy 藤が丘店" />

        <div className={styles.messageList}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div className={styles.spacer} />
        </div>
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
