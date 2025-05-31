"use client";

import { usePathname, useRouter } from "next/navigation";
import style from "./myId.module.scss";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";

import copy from "@/assets/copy.svg";
import camera from "@/assets/camera.svg";
import share from "@/assets/share.svg";
import fot from "@/assets/fot.svg";
import yohaku from "@/assets/yohaku.svg";
import { useEffect, useState } from "react";

export const MyId = () => {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const userId = pathArr[pathArr.length - 1];
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  //追加ボタンがあるリンクに飛ばす
  const profileUrl = `https://www.figma.com/design/bLlkKV8BA7aChp4pOEUSAU/Yo-haku?node-id=293-1080&t=5kzOVmQWoJHYIAQH-0`;

  const handleCameraClick = () => {
    router.push(`/friend/${userId}/scan`);
  };

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

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
    } catch {
      console.error("コピー失敗");
    }
  };

  //数秒後に消えるりょ離
  useEffect(() => {
    if (copied) {
      // copiedがtrueになったら3秒後にfalseに戻すタイマーを設定
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
          <Image src={fot} alt="カメラのボタン" width={65} height={65} />
        </div>
      </div>
    </>
  );
};
