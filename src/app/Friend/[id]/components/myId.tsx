"use client";

import { usePathname, useRouter } from "next/navigation";
import style from "./myId.module.scss";
import Image from "next/image";

import ReactQRCode from "react-qr-code";

import copy from "@/assets/copy.svg";
import camera from "@/assets/camera.svg";
import share from "@/assets/share.svg";
import fot from "@/assets/fot.svg";
import yohaku from "@/assets/yohaku.svg";

export const MyId = () => {
  // URLパスからuserIdを取得
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const userId = pathArr[pathArr.length - 1];

  const router = useRouter();

  // QRコードに埋め込むURL
  const profileUrl = `https://www.figma.com/design/bLlkKV8BA7aChp4pOEUSAU/Yo-haku?node-id=293-1080&t=5kzOVmQWoJHYIAQH-0`;

  // カメラアイコン押下時にスキャンページへ遷移
  const handleCameraClick = () => {
    router.push(`/friend/${userId}/scan`);
  };

  return (
    <div className={style.content}>
      <div className={style.myId}>
        <p className={style.idText}>
          My ID: {userId}
          <Image
            className={style.coptImg}
            src={copy}
            alt="コピーアイコン"
            width={23}
            height={23}
          />
        </p>
      </div>

      <div
        className={style.qrCode}
        style={{ position: "relative", width: 230, height: 230 }}
      >
        {/* QRコード */}
        <ReactQRCode
          value={profileUrl}
          size={230}
          bgColor="#fff"
          fgColor="#3fe57b"
          level="H"
        />
        {/* QRコード中央のアイコンを重ねる */}
        <div
          className={style.icon}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 64,
            height: 64,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none", // アイコンにマウスイベントを通さない
          }}
        >
          <Image src={yohaku} alt="中央アイコン" width={64} height={64} />
        </div>
      </div>

      <div className={style.button}>
        <Image
          onClick={handleCameraClick}
          src={camera}
          alt="カメラのボタン"
          width={65}
          height={65}
        />
        {/* 他のボタン（シェア、写真など） */}
        <Image src={share} alt="シェアのボタン" width={65} height={65} />
        <Image src={fot} alt="写真のボタン" width={65} height={65} />
      </div>
    </div>
  );
};
