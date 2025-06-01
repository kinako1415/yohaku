"use client";

import { usePathname, useRouter } from "next/navigation";
import style from "./myId.module.scss";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import { Html5Qrcode } from "html5-qrcode";

import copy from "@/assets/copy.svg";
import camera from "@/assets/camera.svg";
import share from "@/assets/share.svg";
import fot from "@/assets/fot.svg";
import yohaku from "@/assets/yohaku.svg";
import { useEffect, useState, useRef } from "react";

export const MyId = () => {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const userId = pathArr[pathArr.length - 1];
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //追加ボタンがあるリンクに飛ばす
  const profileUrl = `https://www.figma.com/design/bLlkKV8BA7aChp4pOEUSAU/Yo-haku?node-id=293-1080&t=5kzOVmQWoJHYIAQH-0`;

  // 画像を選んでQR読み取り
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const scanner = new Html5Qrcode("hidden-reader");

    try {
      const result = await scanner.scanFile(file, true);
      alert(result);
    } catch (err) {
      alert("QRコードの読み取りに失敗しました。");
      console.error(err);
    }
  };

  // `share` 画像クリック → inputクリック
  const handleShareClick = () => {
    fileInputRef.current?.click();
  };

  //カメラを起動
  const handleCameraClick = () => {
    router.push(`/friend/${userId}/scan`);
  };

  //QRコードをダウンロード
  const downloadQrCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "QRCode.png";
      link.href = dataURL;
      link.click();
    }
  };

  //コピーする関数
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
    } catch {
      console.error("コピー失敗");
    }
  };

  //コピー完了が数秒後に消える
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  return (
    <>
      <div className={style.content}>
        <div className={style.myId}>
          <p className={style.idText}>
            My ID:{userId}
            <Image
              onClick={handleCopyClick}
              className={style.coptImg}
              src={copy}
              alt="copyの画像"
              width={23}
              height={23}
              style={{ cursor: "pointer" }}
            />
          </p>
        </div>
        <div className={style.copy}>{copied ? "コピーが完了しました" : ""}</div>
        <div className={style.qrCode}>
          <QRCodeCanvas
            value={profileUrl}
            size={230}
            bgColor="#fff"
            fgColor="#3fe57b"
            level="H"
            imageSettings={{
              src: yohaku.src,
              height: 65,
              width: 65,
              excavate: true,
            }}
          />
        </div>
        <div className={style.button}>
          <Image
            onClick={handleCameraClick}
            src={camera}
            alt="カメラのボタン"
            width={65}
            height={65}
            style={{ cursor: "pointer" }}
          />
          <Image
            onClick={downloadQrCode}
            src={share}
            alt="ダウンロード"
            width={65}
            height={65}
            style={{ cursor: "pointer" }}
          />
          <Image
            onClick={handleShareClick}
            src={fot}
            alt="カメラのボタン"
            width={65}
            height={65}
          />

          {/* 隠しinputファイル選択 */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>

        {/* hiddenスキャナDOM（html5-qrcodeが必要） */}
        <div id="hidden-reader" style={{ display: "none" }} />
      </div>
    </>
  );
};
