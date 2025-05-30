"use client";
import { useState } from "react";
import { SocialButton } from "@/components/elements/SocialButton";
import { InputField } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import Image from "next/image";
import styles from "./login.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async () => {
    setIsLoading(true);
    console.log("Email login:", { email, password });
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className={styles.container}>
      <Image
        src="/topLogo.svg"
        alt="toggle visibility"
        width={300}
        height={260}
        priority
        className={styles.image}
      />

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleEmailLogin();
        }}
      >
        <div className={styles.inputGroup}>
          <InputField
            label="メールアドレス"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <InputField
            label="パスワード"
            isPassword
            placeholder="パスワードを入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="ログイン中..."
          fullWidth
        >
          ログイン
        </Button>
      </form>

      <p className={styles.signupText}>
        アカウントをお持ちでない方は{" "}
        <a href="/signup" className={styles.signupLink}>
          新規登録
        </a>
      </p>

      <div className={styles.divider}>
        <span className={styles.dividerText}>または</span>
      </div>

      <div className={styles.socialSection}>
        <SocialButton provider="apple" onClick={handleAppleLogin} fullWidth />

        <SocialButton provider="google" onClick={handleGoogleLogin} fullWidth />
      </div>
    </div>
  );
}
