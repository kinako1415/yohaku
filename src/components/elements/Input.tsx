"use client";
import { forwardRef, useState } from "react";
import styles from "./Input.module.scss";
import Image from "next/image";

type InputSize = "sm" | "md" | "lg";
type InputVariant = "default" | "filled";

type InputFieldProps = {
  url?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
  errors?: string;
  isPassword?: boolean;
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      url,
      onChange,
      type = "text",
      placeholder,
      errors,
      isPassword = false,
      size = "md",
      variant = "default",
      fullWidth = true,
      leftIcon,
      rightIcon,
      label,
      className = "",
      disabled,
      ...rest
    },
    ref
  ) => {
    const [isHidden, setIsHidden] = useState<boolean>(true);

    const containerClasses = [styles.container, !fullWidth && styles.fitContent]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [
      styles.input,
      size && styles[size],
      variant && styles[variant],
      errors && styles.errorBorder,
      leftIcon && styles.hasLeftIcon,
      (rightIcon || isPassword || url) && styles.hasRightIcon,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.error}>{errors}</div>
        <div className={styles.inputContainer}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          {isPassword ? (
            <input
              className={inputClasses}
              type={isHidden ? "password" : "text"}
              placeholder={placeholder}
              onChange={(e) => {
                onChange(e);
              }}
              disabled={disabled}
              ref={ref}
              {...rest}
            />
          ) : (
            <input
              className={inputClasses}
              type={type}
              placeholder={placeholder}
              onChange={(e) => {
                onChange(e);
              }}
              disabled={disabled}
              ref={ref}
              {...rest}
            />
          )}
          {(isPassword || url || rightIcon) && (
            <span className={styles.rightIcon}>
              {isPassword ? (
                <Image
                  src={
                    isHidden
                      ? "https://api.iconify.design/line-md:watch-off-loop.svg?color=%23A4A5B5"
                      : "https://api.iconify.design/line-md:watch-loop.svg?color=%23A4A5B5"
                  }
                  alt="toggle visibility"
                  width={24}
                  height={24}
                  priority
                  className={styles.image}
                  onClick={() => setIsHidden(!isHidden)}
                />
              ) : rightIcon ? (
                rightIcon
              ) : url ? (
                <Image
                  src={url}
                  alt="icon"
                  width={24}
                  height={24}
                  priority
                  className={styles.image}
                />
              ) : null}
            </span>
          )}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
