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
import { useRouter } from "next/navigation";
import { auth, appleProvider, googleProvider } from "@/libs/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInValue>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: signInValue) => {
    try {
      setIsLoading(true);
      console.log("Email login:", data);
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } finally {
      setIsLoading(false);
      router.push("/");
    }
  };

  const handleAppleLogin = () => {
    signInWithPopup(auth, appleProvider).then(() => {
      router.push("/");
    });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      router.push("/");
    });
  };

  return (
    <div className={styles.container}>
      <Image
        src="/topLogo.svg"
        alt="toggle visibility"
        width={320}
        height={120}
        priority
        className={styles.image}
      />

      <div className={styles.titleContainer}>
        <div className={styles.title}>サインイン</div>
        <p className={styles.description}>
          ちょっとしたスキマ時間
          <br />
          誰かとふらっと会いたくなったら、ここへ。
        </p>
      </div>

      <motion.form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        </div>

        <div className={styles.spacer} />
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
