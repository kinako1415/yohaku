"use client";
import { useState } from "react";
import { IconButton } from "@/components/elements/IconButton";
import styles from "./icontest.module.scss";

export default function IconTestPage() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>IconButton Components</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sizes</h2>
        <div className={styles.buttonGroup}>
          <IconButton
            icon="https://api.iconify.design/material-symbols:chevron-left-rounded.svg?color=%2322c55e"
            size="sm"
            alt="Small icon"
          />
          <IconButton
            icon="https://api.iconify.design/material-symbols:chevron-left-rounded.svg?color=%2322c55e"
            size="md"
            alt="Medium icon"
          />
          <IconButton
            icon="https://api.iconify.design/material-symbols:chevron-left-rounded.svg?color=%2322c55e"
            size="lg"
            alt="Large icon"
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>States</h2>
        <div className={styles.buttonGroup}>
          <IconButton
            icon="https://api.iconify.design/material-symbols:chevron-left-rounded.svg?color=%2322c55e"
            onClick={handleClick}
            alt="Normal state"
          />
          <IconButton
            icon="https://api.iconify.design/material-symbols:chevron-left-rounded.svg?color=%2322c55e"
            loading={loading}
            onClick={handleClick}
            alt="Loading state"
          />
          <IconButton
            icon="https://api.iconify.design/material-symbols:chevron-left-rounded.svg?color=%2322c55e"
            disabled
            alt="Disabled state"
          />
        </div>
      </section>
    </div>
  );
}
