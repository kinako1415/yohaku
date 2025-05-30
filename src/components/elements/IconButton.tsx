"use client";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import Image from "next/image";
import styles from "./IconButton.module.scss";

interface IconButtonProps {
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon: string;
  alt?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      onClick,
      size = "md",
      disabled = false,
      loading = false,
      icon,
      alt = "icon",
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const buttonClasses = [
      styles.iconButton,
      styles[size],
      disabled && styles.disabled,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const iconSize = {
      sm: 24,
      md: 28,
      lg: 32,
    }[size];

    return (
      <motion.button
        ref={ref}
        type={type}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || loading}
        whileTap={
          !disabled && !loading
            ? {
                scale: 0.95,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }
            : undefined
        }
        whileHover={
          !disabled && !loading
            ? {
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }
            : undefined
        }
        {...props}
      >
        {loading ? (
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle} />
          </div>
        ) : (
          <Image
            src={icon}
            alt={alt}
            width={iconSize}
            height={iconSize}
            className={styles.icon}
            priority={false}
          />
        )}
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";
