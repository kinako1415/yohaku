"use client";
import { useState } from "react";
import { InputField } from "@/components/elements/Input";
import { IconButton } from "@/components/elements/IconButton";
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

  const handleSendClick = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          radius="full"
          placeholder="メッセージを入力..."
          variant="filled"
          rightIcon={
            !inputValue.trim() ? (
              <IconButton
                icon="https://api.iconify.design/mynaui:send.svg?color=%231F2937"
                size="sm"
                disabled
                onClick={handleSendClick}
                className={styles.sendButton}
              />
            ) : (
              <IconButton
                icon="https://api.iconify.design/mynaui:send.svg?color=%23ffffff"
                size="sm"
                onClick={handleSendClick}
                className={styles.sendButton}
              />
            )
          }
          className={styles.messageInput}
        />
      </form>
    </div>
  );
};
