"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInValue } from "@/schemas/signIn";
import { SocialButton } from "@/components/elements/SocialButton";
import { InputField } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./signin.module.scss";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInValue>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: signInValue) => {
    setIsLoading(true);
    console.log("Email login:", data);
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
        width={320}
        height={200}
        priority
        className={styles.image}
      />

      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <span>おかえりなさい、</span>
          <span>サインインはこちら</span>
        </div>
        <p className={styles.description}>
          スキマ時間にふらっと会える。そんな毎日をはじめよう。
        </p>
      </div>

      <motion.form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.inputGroup}>
          <InputField
            label="メールアドレス"
            type="email"
            placeholder="example@email.com"
            errors={errors.email?.message}
            fullWidth
            {...register("email")}
          />
        </div>

        <div className={styles.inputGroup}>
          <InputField
            label="パスワード"
            isPassword
            placeholder="パスワードを入力"
            errors={errors.password?.message}
            fullWidth
            {...register("password")}
          />
        </div>

        <Button type="submit" isLoading={isLoading} fullWidth>
          ログイン
        </Button>
      </motion.form>

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
