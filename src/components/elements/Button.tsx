"use client";
import { motion } from "framer-motion";
import styles from "./Button.module.scss";
import Image from "next/image";
import { useState, forwardRef } from "react";

type ButtonColor = "primary" | "gray" | "red" | "success" | "warning";
type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "outline" | "translate";

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
  tabIndex?: number;
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
      tabIndex,
      style,
      testId,
      loadingText,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

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
            <Image
              alt="loading"
              src="https://api.iconify.design/line-md:loading-loop.svg?color=%23ffffff"
              width={28}
              height={28}
              priority
              className={styles.image}
            />
            {loadingText && <span>{loadingText}</span>}
          </>
        );
      }

      return (
        <>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          {variant === "translate" ? (
            <div className={styles.content}>
              <motion.div
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  duration: 0.5,
                }}
              >
                <Image
                  alt="translate"
                  src={`https://api.iconify.design/octicon:sparkles-fill-16.svg?color=${
                    disabled ? "%23A4A5B5" : "%23ffffff"
                  }`}
                  width={24}
                  height={24}
                  priority
                />
              </motion.div>
              {children}
            </div>
          ) : (
            children
          )}
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
        tabIndex={tabIndex}
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
