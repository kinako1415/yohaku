"use client";
import { motion } from "framer-motion";
import styles from "./SocialButton.module.scss";
import { forwardRef } from "react";
import Image from "next/image";

type SocialProvider = "apple" | "google";

interface SocialButtonProps {
  provider: SocialProvider;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  testId?: string;
  children?: React.ReactNode;
}

const AppleIcon = () => (
  <Image
    src="https://api.iconify.design/devicon:apple.svg?color=%23ffffff"
    alt="Apple"
    width={20}
    height={20}
    priority
  />
);

const GoogleIcon = () => (
  <Image
    src="https://api.iconify.design/devicon:google.svg?color=%23ffffff"
    alt="Google"
    width={20}
    height={20}
    priority
  />
);

const getIcon = (provider: SocialProvider) => {
  switch (provider) {
    case "apple":
      return <AppleIcon />;
    case "google":
      return <GoogleIcon />;
    default:
      return null;
  }
};

const getButtonText = (provider: SocialProvider) => {
  switch (provider) {
    case "apple":
      return "Appleでログイン";
    case "google":
      return "Googleでログイン";
    default:
      return "";
  }
};

export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  (
    {
      provider,
      onClick,
      disabled = false,
      isLoading = false,
      fullWidth = true,
      className = "",
      id,
      style,
      testId,
      children,
    },
    ref
  ) => {
    const buttonClasses = [
      styles.socialButton,
      styles[provider],
      fullWidth ? styles.fullWidth : "",
      disabled ? styles.disabled : "",
      isLoading ? styles.loading : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <motion.button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
        className={buttonClasses}
        id={id}
        style={style}
        data-testid={testId}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.1 }}
      >
        <div className={styles.content}>
          {!isLoading && <div className={styles.icon}>{getIcon(provider)}</div>}
          {isLoading && (
            <div className={styles.spinner}>
              <div className={styles.spinnerCircle} />
            </div>
          )}
          <span className={styles.text}>
            {children || getButtonText(provider)}
          </span>
        </div>
      </motion.button>
    );
  }
);

SocialButton.displayName = "SocialButton";
