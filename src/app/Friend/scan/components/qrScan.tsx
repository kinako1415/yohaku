"use client";

import React, { useState } from "react";
import { useZxing } from "react-zxing";
import styles from "./scan.module.scss";

export const QrScan = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <>
      <div className={styles.wrapper}>
        <video ref={ref} className={styles.video} />
        <div className={styles.mask}>
          <div className={styles.top}></div>
          <div className={styles.bottom}></div>
          <div className={styles.left}></div>
          <div className={styles.right}></div>
        </div>
        <div className={styles.scanLine}></div>

        <div className={styles.scanBox}></div>
      </div>
    </>
  );
};
