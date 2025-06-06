"use client";

import React, { useState } from "react";
import { useZxing } from "react-zxing";
import styles from "./scan.module.scss";
import Image from "next/image";
import frame from "@/assets/qrCodeFrame.svg"; // Adjust the path as necessary

export const QrScan = () => {
  const [, setResult] = useState("");
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
        <Image
          src={frame}
          alt="QR Scan Frame"
          className={styles.frame}
          width={310}
          height={310}
        />
      </div>
    </>
  );
};
