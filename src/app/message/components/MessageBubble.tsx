"use client";
import styles from "./MessageBubble.module.scss";

type Message = {
  id: string;
  text: string;
  sender: "user" | "other";
  senderName: string;
  timestamp: string;
};

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`${styles.messageContainer} ${
        isUser ? styles.userMessage : styles.otherMessage
      }`}
    >
      {!isUser && <div className={styles.senderName}>{message.senderName}</div>}
      <div
        className={`${styles.messageBubble} ${
          isUser ? styles.userBubble : styles.otherBubble
        }`}
      >
        {message.text}
      </div>
      <div
        className={`${styles.timestamp} ${
          isUser ? styles.userTimestamp : styles.otherTimestamp
        }`}
      >
        {isUser && (
          <span className={styles.senderName}>{message.senderName}</span>
        )}
        <span>{message.timestamp}</span>
      </div>
    </div>
  );
};
