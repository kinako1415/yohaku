"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InputArea } from "@/components/elements/InputArea";
import styles from "./newPost.module.scss";
import { InputField } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";

interface PostData {
  title: string;
  location: string;
}

export default function NewPostPage() {
  const router = useRouter();

  const [postData, setPostData] = useState<PostData>({
    title: "",
    location: "",
  });

  const handleInputChange = (field: keyof PostData, value: string) => {
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!postData.title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    if (!postData.location.trim()) {
      alert("場所を入力してください");
      return;
    }

    console.log("投稿データ:", postData);
    router.back();
  };

  const isFormValid = postData.title.trim() && postData.location.trim();

  return (
    <div className={styles.container}>
      <Button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={styles.submitButton}
        fullWidth={false}
      >
        Yo hakuをシェアする
      </Button>

      <div className={styles.section}>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => router.back()}
            className={styles.backButton}
            fullWidth={false}
            variant="solid"
          >
            今から
          </Button>

          <Button
            onClick={() => router.back()}
            className={styles.backButton}
            fullWidth={false}
          >
            後日指定
          </Button>
        </div>
        <InputArea
          value={postData.title}
          label="タイトル"
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="イベントのタイトルを入力"
          rows={3}
          maxLength={100}
          showCharCount
        />
        <InputField
          type="text"
          label="場所"
          value={postData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          placeholder="例: 渋谷駅周辺"
          required
        />
      </div>
    </div>
  );
}
