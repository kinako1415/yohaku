"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema, UsernameValue } from "@/schemas/username";
import { InputField } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./usernameForm.module.scss";

interface UsernameFormProps {
  onComplete?: (username: string) => void;
}

export default function UsernameForm({ onComplete }: UsernameFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameValue>({
    resolver: zodResolver(usernameSchema),
  });

  const onSubmit = async (data: UsernameValue) => {
    setIsLoading(true);
    console.log("Username selected:", data.username);

    setTimeout(() => {
      setIsLoading(false);
      onComplete?.(data.username);
    }, 1500);
  };

  return (
    <motion.div
      className={styles.container}
      style={{ position: "relative" }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.15, delay: 0.1 }}
    >
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>ニックネーム</h1>
        <p className={styles.description}>
          友達に表示されるニックネームを考えよう
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputSection}>
          <InputField
            type="text"
            label="ニックネーム"
            placeholder="ニックネームを入力"
            errors={errors.username?.message}
            fullWidth
            {...register("username")}
          />
        </div>

        <div className={styles.buttonSection}>
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth
            className={styles.completeButton}
          >
            始める
          </Button>
        </div>
      </form>
      <motion.div
        className={styles.image}
        style={{ position: "absolute" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          spring: { stiffness: 300, damping: 20 },
          duration: 0.2,
          delay: 0.4,
        }}
      >
        <Image
          src="/nicknameIcon.svg"
          alt="Yohaku Logo"
          width={320}
          height={320}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
