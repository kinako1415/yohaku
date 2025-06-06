"use client";
import { useState } from "react";
import styles from "./DateLocationCard.module.scss";

interface DateLocationCardProps {
  date: string;
  location: string;
  description?: string;
}

export const DateLocationCard = ({
  date,
  location,
  description = "ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。",
}: DateLocationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${styles.card} ${!isExpanded ? styles.collapsed : ""}`}
      onClick={toggleExpanded}
    >
      <div className={styles.header}>
        <div className={styles.dateSection}>
          <span className={styles.dateLabel}>日時</span>
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.locationSection}>
          <span className={styles.locationLabel}>場所</span>
          <span className={styles.location}>{location}</span>
        </div>
        <div className={styles.toggleButton}>
          <span
            className={`${styles.arrow} ${isExpanded ? styles.expanded : ""}`}
          >
            ▼
          </span>
        </div>
      </div>
      {description && (
        <div
          className={`${styles.description} ${
            !isExpanded ? styles.collapsed : ""
          } ${styles.expandTransition}`}
        >
          {description}
        </div>
      )}
    </div>
  );
};
