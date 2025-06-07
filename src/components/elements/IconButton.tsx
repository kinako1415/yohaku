"use client";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import styles from "./IconButton.module.scss";

// アイコンコンポーネントをマッピング
const getIconSVG = (
  iconName: string,
  size: number = 24
): React.ReactElement => {
  const iconMap: Record<string, React.ReactElement> = {
    "arrow-left": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M19 12H5M5 12L12 19M5 12L12 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    camera: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M9 3H15L17 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7L9 3Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    menu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12H21M3 6H21M3 18H21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    x: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    user: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  };

  return (
    iconMap[iconName] || (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M9 9H15V15H9V9Z" fill="currentColor" />
      </svg>
    )
  );
};

interface IconButtonProps {
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  isLoading?: boolean;
  icon: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      onClick,
      size = "md",
      disabled = false,
      isLoading: loading = false,
      icon,
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
        initial={{
          scale: 1,
        }}
        whileTap={
          !disabled && !loading
            ? {
                scale: 0.95,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }
            : { scale: 1 }
        }
        whileHover={
          !disabled && !loading
            ? {
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }
            : { scale: 1 }
        }
        {...props}
      >
        {loading ? (
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle} />
          </div>
        ) : (
          <div
            className={`${styles.icon} ${disabled ? styles.disabledIcon : ""}`}
            style={{
              opacity: disabled ? 0.6 : 1,
            }}
          >
            {getIconSVG(icon, iconSize)}
          </div>
        )}
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";
