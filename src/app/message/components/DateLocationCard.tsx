"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./DateLocationCard.module.scss";
import Image from "next/image";

interface DateLocationCardProps {
  date: string;
  location: string;
  description?: string;
}

export const DateLocationCard = ({
  date,
  location,
  description = "ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。ここに詳細を書く。",
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
        <motion.div
          className={styles.toggleButton}
          animate={{
            rotate: isExpanded ? 180 : 0,
          }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          <Image
            src={`https://api.iconify.design/heroicons:chevron-down-16-solid.svg?color=%231F2937`}
            alt={`icon`}
            width={24}
            height={24}
            style={{ transformOrigin: "center" }}
            priority={false}
          />
        </motion.div>
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
