"use client";
import { forwardRef } from "react";
import styles from "./InputArea.module.scss";

type InputAreaSize = "sm" | "md" | "lg";
type InputAreaVariant = "default" | "filled";

interface InputAreaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  errors?: string;
  size?: InputAreaSize;
  variant?: InputAreaVariant;
  fullWidth?: boolean;
  label?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  fullHeight?: boolean;
  fixedHeight?: number | string;
}

export const InputArea = forwardRef<
  HTMLTextAreaElement,
  InputAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(
  (
    {
      onChange,
      placeholder,
      errors,
      size = "md",
      variant = "default",
      fullWidth = true,
      label,
      rows = 4,
      className = "",
      disabled = false,
      maxLength,
      showCharCount = false,
      value,
      fullHeight = false,
      fixedHeight,
      ...rest
    },
    ref
  ) => {
    const containerClasses = [styles.container, !fullWidth && styles.fitContent]
      .filter(Boolean)
      .join(" ");

    const textareaClasses = [
      styles.textarea,
      styles[size],
      styles[variant],
      errors && styles.errorBorder,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const currentLength = typeof value === "string" ? value.length : 0;
    const isOverLimit = maxLength ? currentLength > maxLength : false;

    const getHeightStyles = () => {
      const styles: React.CSSProperties = {
        resize: "none",
      };

      if (fullHeight) {
        styles.height = "100vh";
        styles.overflow = "auto";
      }

      if (fixedHeight) {
        styles.height =
          typeof fixedHeight === "number" ? `${fixedHeight}px` : fixedHeight;
        styles.overflow = "auto";
      }

      return styles;
    };

    return (
      <div className={containerClasses}>
        <div className={styles.labelContainer}>
          {label && <label className={styles.label}>{label}</label>}
          <div className={styles.error}>{errors}</div>
        </div>
        <div className={styles.textareaContainer}>
          <textarea
            ref={ref}
            className={textareaClasses}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            rows={rows}
            style={getHeightStyles()}
            maxLength={maxLength}
            value={value}
            {...rest}
          />
          {showCharCount && maxLength && (
            <div
              className={`${styles.charCount} ${
                isOverLimit ? styles.overLimit : ""
              }`}
            >
              {currentLength} / {maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
);

InputArea.displayName = "InputArea";
