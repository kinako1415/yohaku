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
  // 高さ指定プロパティ
  height?: number | string;          // 固定高さ（px または CSS値）
  minHeight?: number | string;       // 最小高さ
  maxHeight?: number | string;       // 最大高さ
  autoHeight?: boolean;              // 内容に応じて自動調整
  fixedHeight?: boolean;             // 固定高さ（スクロール有効）
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
      // 高さ指定プロパティ
      height,
      minHeight,
      maxHeight,
      autoHeight = false,
      fixedHeight = false,
      ...rest
    },
    ref
  ) => {
    const containerClasses = [
      styles.container,
      !fullWidth && styles.fitContent,
    ]
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

    // 高さ関連のスタイルを計算
    const getHeightStyles = () => {
      const styles: React.CSSProperties = {
        resize: "none", // リサイズを無効化
      };

      if (height) {
        styles.height = typeof height === "number" ? `${height}px` : height;
      }

      if (minHeight) {
        styles.minHeight = typeof minHeight === "number" ? `${minHeight}px` : minHeight;
      }

      if (maxHeight) {
        styles.maxHeight = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
      }

      if (fixedHeight && height) {
        styles.height = typeof height === "number" ? `${height}px` : height;
        styles.overflow = "auto";
      }

      if (autoHeight) {
        styles.resize = "none";
        styles.overflow = "hidden";
        // 自動高さ調整の場合は最小高さを設定
        if (!minHeight) {
          styles.minHeight = size === "sm" ? "80px" : size === "lg" ? "160px" : "120px";
        }
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
            <div className={`${styles.charCount} ${isOverLimit ? styles.overLimit : ""}`}>
              {currentLength} / {maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
);

InputArea.displayName = "InputArea";
