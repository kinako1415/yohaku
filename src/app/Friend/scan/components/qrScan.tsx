"use client";

import { useRef, useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import style from "./scan.module.scss";

export const QrScan = () => {
  const [decodedText, setDecodedText] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isStarted, setIsStarter] = useState<boolean>(false);

  useEffect(() => {
    // 既にスキャナーが初期化されている場合は何もしない
    if (scannerRef.current) {
      return;
    }

    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    const startCamera = async () => {
      if (isStarted) return;

      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices.length === 0) {
          console.warn("カメラが見つかりませんでした。");
          return;
        }

        setIsStarter(true); // 開始フラグをセット

        await scanner.start(
          { facingMode: "environment" },
          { fps: 5, qrbox: 250 },
          (text) => {
            setDecodedText(text);
            // 読み取り成功後、スキャナーを停止しクリア
            scanner.stop().then(() => scanner.clear());
            setIsStarter(false);
          },
          (err) => console.warn("読み取りエラー:", err)
        );
      } catch (err) {
        console.error("カメラ初期化失敗:", err);
      }
    };

    startCamera(); // コンポーネントマウント時にカメラを起動
  }, []);

  return (
    <div className={style.content}>
      <div id="reader" className={style.reader} />
      {decodedText && (
        <div>
          <p>読み取った内容:</p>
          <a href={decodedText} target="_blank" rel="noopener noreferrer">
            {decodedText}
          </a>
        </div>
      )}
    </div>
  );
};
