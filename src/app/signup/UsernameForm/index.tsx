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

export function UsernameForm({ onComplete }: UsernameFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameValue>({
    resolver: zodResolver(usernameSchema),
  });

  const onSubmit = async (data: UsernameValue) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsCompleting(true);

      // Exit animation duration before completing
      setTimeout(() => {
        onComplete?.(data.username);
      }, 800);
    }, 1500);
  };

  return (
    <motion.div
      className={styles.container}
      style={{ position: "relative" }}
      initial={{ x: "100%", opacity: 0 }}
      animate={
        isCompleting
          ? { x: "0%", opacity: 0, scale: 0.8 }
          : { x: 0, opacity: 1 }
      }
      transition={{
        type: "spring",
        stiffness: isCompleting ? 350 : 280,
        damping: isCompleting ? 30 : 25,
        mass: 0.8,
        duration: isCompleting ? 0.6 : undefined,
      }}
    >
      <motion.div
        className={styles.titleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={
          isCompleting ? { opacity: 0, y: 0, scale: 0.8 } : { opacity: 1, y: 0 }
        }
        transition={{
          delay: isCompleting ? 0 : 0.1,
          duration: isCompleting ? 0.4 : 0.6,
          ease: "easeInOut",
        }}
      >
        <h1 className={styles.title}>ニックネーム</h1>
        <p className={styles.description}>
          友達に表示されるニックネームを考えよう
        </p>
      </motion.div>

      <motion.form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={
          isCompleting ? { opacity: 0, y: 0, scale: 0.8 } : { opacity: 1, y: 0 }
        }
        transition={{
          delay: isCompleting ? 0.1 : 0.2,
          duration: isCompleting ? 0.4 : 0.6,
          ease: "easeInOut",
        }}
      >
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
      </motion.form>
      <motion.div
        className={styles.image}
        style={{
          position: "absolute",
          bottom: "40px",
          zIndex: 1,
        }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={
          isCompleting
            ? {
                opacity: 0,
                scale: 0.8,
                y: 0,
              }
            : {
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: [0, -5, 5, -3, 3, 0],
              }
        }
        transition={
          isCompleting
            ? {
                duration: 0.8,
                delay: 0.2,
                ease: "easeInOut",
              }
            : {
                type: "spring",
                stiffness: 200,
                damping: 15,
                mass: 1,
                delay: 0.3,
                rotate: {
                  duration: 0.6,
                  delay: 0.5,
                  ease: "easeInOut",
                },
              }
        }
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
