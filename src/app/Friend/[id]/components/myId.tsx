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
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const userId = pathArr[pathArr.length - 1];
  const router = useRouter();

  const profileUrl = `https://www.figma.com/design/bLlkKV8BA7aChp4pOEUSAU/Yo-haku?node-id=293-1080&t=5kzOVmQWoJHYIAQH-0`;

  const handleCameraClick = () => {
    router.push(`/friend/${userId}/scan`);
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
          <ReactQRCode
            value={profileUrl}
            size={230}
            bgColor="#fff"
            fgColor="#3fe57b"
            level="H"
          />
          <div className={style.icon}>
            <Image src={yohaku} alt="中央アイコン" width={64} height={64} />
          </div>
        </div>
        <div className={style.button}>
          <Image  src={camera} alt="カメラのボタン" width={65} height={65} />
          <Image src={share} alt="カメラのボタン" width={65} height={65} />
          <Image src={fot} alt="カメラのボタン" width={65} height={65} />
        </div>
      </div>
    </>
  );
};
