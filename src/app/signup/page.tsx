"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpValue } from "@/schemas/signUp";
import { SocialButton } from "@/components/elements/SocialButton";
import { InputField } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import Image from "next/image";
import styles from "./signup.module.scss";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpValue>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: signUpValue) => {
    setIsLoading(true);
    console.log("Email signup:", data);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleAppleLogin = () => {
    console.log("Apple signup clicked");
  };

  const handleGoogleLogin = () => {
    console.log("Google signup clicked");
  };

  return (
    <div className={styles.container}>
      <Image
        src="/topLogo.svg"
        alt="Yohaku Logo"
        width={320}
        height={120}
        priority
        className={styles.image}
      />

      <div className={styles.titleContainer}>
        <div className={styles.title}>アカウント作成</div>
        <p className={styles.description}>
          アカウントを作成して、今日からYo hakuを。
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <InputField
            label="メールアドレス"
            type="email"
            placeholder="example@email.com"
            errors={errors.email?.message}
            fullWidth
            {...register("email")}
          />

          <InputField
            label="パスワード"
            isPassword
            placeholder="パスワードを入力"
            errors={errors.password?.message}
            fullWidth
            {...register("password")}
          />

          <InputField
            label="パスワード確認"
            isPassword
            placeholder="パスワードを再入力"
            errors={errors.passwordConfirm?.message}
            fullWidth
            {...register("passwordConfirm")}
          />
        </div>

        <div className={styles.spacer} />
        <Button type="submit" isLoading={isLoading} fullWidth>
          アカウント作成
        </Button>
      </form>

      <p className={styles.signinText}>
        すでにアカウントをお持ちの方は{" "}
        <a href="/signin" className={styles.signinLink}>
          サインイン
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
