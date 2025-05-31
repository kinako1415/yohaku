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

export const MyId = () => {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const userId = pathArr[pathArr.length - 1];
  const router = useRouter();

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

  return (
    <>
      <div className={style.content}>
        <div className={style.myId}>
          <p className={style.idText}>
            My ID:{userId}
            <Image
              className={style.coptImg}
              src={copy}
              alt="copyの画像"
              width={23}
              height={23}
            />
          </p>
        </div>
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
