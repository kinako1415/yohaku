"use client";

import camera from "@/assets/camera.svg";
import share from "@/assets/share.svg";
import fot from "@/assets/fot.svg";
import { useRef } from "react";
import { useRouter } from "next/navigation"; 
import { Html5Qrcode } from "html5-qrcode";
import { usePathname } from "next/navigation";
import style from "./friendAdd.module.scss";
import Image from "next/image";

export const FriendAdd = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const userId = pathArr[pathArr.length - 1];

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
  return (
    <>
      {" "}
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
    </>
  );
};
