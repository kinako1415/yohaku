"use client";

import { useRef, useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import style from "./scan.module.scss";
import { FriendAdd } from "../../[id]/components/friendAdd";

export const QrScan = () => {
  const [decodedText, setDecodedText] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false); // 変数名を修正

  useEffect(() => {
    // 既にスキャナーが初期化されている場合は何もしない
    if (scannerRef.current) {
      return;
    }

    // "reader" はカメラプレビューを表示するdivのID
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    const startCamera = async () => {
      // isStarted のチェックを useEffect の外ではなく、ここで
      if (isStarted) return;

      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices.length === 0) {
          console.warn("カメラが見つかりませんでした。");
          return;
        }

        setIsStarted(true); // 開始フラグをセット

        await scanner.start(
          { facingMode: "environment" },
          { fps: 5, qrbox: { width: 250, height: 250 } },

          (text) => {
            setDecodedText(text);
            // 読み取り成功後、スキャナーを停止しクリア
            if (scannerRef.current) {
              // nullチェックを追加
              scannerRef.current.stop().then(() => scannerRef.current?.clear()); // nullチェックを追加
            }
            setIsStarted(false);
          },
          (err) => console.warn("読み取りエラー:", err)
        );
      } catch (err) {
        console.error("カメラ初期化失敗:", err);
        setIsStarted(false); // エラー時もフラグをリセット
      }
    };

    if (!isStarted) {
      startCamera();
    }
  }, [isStarted]); // isStarted の変更を監視

  return (
    <div className={style.container}>
      <div className={style.cameraWrapper}>
        <div id="reader" className={style.reader}></div>
        <div className={style.qrOverlay}>
          <div className={style.top}></div>
          <div className={style.left}></div>
          <div className={style.right}></div>
          <div className={style.bottom}></div>
        </div>
      </div>
      <div className={style.qrOverlay}></div>

      {decodedText && (
        <div className={style.decodedTextContainer}>
          <p>読み取った内容:</p>
          <a href={decodedText} target="_blank" rel="noopener noreferrer">
            {decodedText}
          </a>
        </div>
      )}
    </div>
  );
};
