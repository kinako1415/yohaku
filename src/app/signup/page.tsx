"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpValue } from "@/schemas/signUp";
import { SocialButton } from "@/components/elements/SocialButton";
import { InputField } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import { UsernameForm } from "./UsernameForm";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "./signup.module.scss";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/libs/firebase";
import { appleProvider } from "@/libs/firebase";
import { registerUser } from "@/actions/user/registerUser";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"signup" | "username">(
    "signup"
  );
  const [signupData, setSignupData] = useState<signUpValue | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpValue>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: signUpValue) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password).then(() => {
      setIsLoading(false);
      setSignupData(data);
      setCurrentStep("username");
    });
  };

  const handleUsernameComplete = async (username: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("failed sign up.");
      return;
    }
    const { success, error } = await registerUser(currentUser.uid, username);
    if (!success) console.error(error);
    console.log("Signup complete with data:", { ...signupData, username });
    router.push("/");
  };

  const handleAppleLogin = () => {
    signInWithPopup(auth, appleProvider).then(() => {
      setCurrentStep("username");
    });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      setCurrentStep("username");
    });
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {currentStep === "signup" ? (
          <motion.div
            key="signup"
            initial={{ x: 0, opacity: 0 }}
            exit={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={styles.stepContainer}
          >
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
                  label="もう一度入力"
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
              <SocialButton
                provider="apple"
                onClick={handleAppleLogin}
                fullWidth
              />
              <SocialButton
                provider="google"
                onClick={handleGoogleLogin}
                fullWidth
              />
            </div>
          </motion.div>
        ) : (
          <UsernameForm key="username" onComplete={handleUsernameComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
