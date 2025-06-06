"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div
      className={styles.card}
      onClick={toggleExpanded}
      transition={{ duration: 0.3 }}
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
          <motion.span
            className={styles.arrow}
            animate={{
              rotate: isExpanded ? 180 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            ▼
          </motion.span>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && description && (
          <motion.div
            className={styles.description}
            initial={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: 12,
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
              opacity: { duration: 0.2 },
            }}
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
