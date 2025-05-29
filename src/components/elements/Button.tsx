"use client";
import { motion } from "framer-motion";
import styles from "./Button.module.scss";
import Image from "next/image";
import { useState, forwardRef } from "react";

type ButtonColor = "primary" | "gray" | "red";
type ButtonSize = "sm" | "lg";
type ButtonVariant = "solid" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  testId?: string;
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type = "button",
      onClick,
      color = "primary",
      size = "md",
      variant = "solid",
      isLoading = false,
      disabled = false,
      fullWidth = true,
      leftIcon,
      rightIcon,
      className = "",
      id,
      style,
      testId,
      loadingText,
    },
    ref
  ) => {
    const [, setIsHovered] = useState(false);

    const buttonClasses = [
      styles.button,
      color && styles[color],
      size && styles[size],
      variant && styles[variant],
      isLoading && styles.loading,
      disabled && styles.disabled,
      !fullWidth && styles.fitContent,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const buttonContent = () => {
      if (isLoading) {
        return (
          <>
            <div className={styles.spinner}>
              <div className={styles.spinnerCircle} />
            </div>
            {loadingText && <span>{loadingText}</span>}
          </>
        );
      }

      return (
        <>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          {children}
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </>
      );
    };

    return (
      <motion.button
        ref={ref}
        id={id}
        className={buttonClasses}
        style={style}
        data-testid={testId}
        onHoverStart={() => !disabled && !isLoading && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        type={type}
        onClick={() => {
          if (onClick && !disabled && !isLoading) onClick();
        }}
        disabled={disabled || isLoading}
      >
        {buttonContent()}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
