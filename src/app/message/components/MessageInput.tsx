"use client";
import { useState } from "react";
import { InputField } from "@/components/elements/Input";
import styles from "./MessageInput.module.scss";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const sendIcon = (
    <button
      type="submit"
      disabled={!inputValue.trim()}
      className={styles.sendButton}
      onClick={handleSubmit}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M22 2L11 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 2L15 22L11 13L2 9L22 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="メッセージを入力..."
          variant="filled"
          rightIcon={sendIcon}
          className={styles.messageInput}
        />
      </form>
    </div>
  );
};
