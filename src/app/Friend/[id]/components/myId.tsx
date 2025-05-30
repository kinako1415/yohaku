"use client";

import { usePathname } from "next/navigation";
import style from "./myId.module.scss";
import qrCode from "@/assets/qrCode.svg";
import Image from "next/image";
import copy from "@/assets/copy.svg";
import camera from "@/assets/camera.svg";
import share from "@/assets/share.svg";
import fot from "@/assets/fot.svg";

export const MyId = () => {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const userId = pathArr[pathArr.length - 1];
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
          <Image src={qrCode} alt="QRコードの例です" width={230} height={230} />
        </div>
        <div className={style.button}>
          <Image src={camera} alt="カメラのボタン" width={65} height={65} />
          <Image src={share} alt="カメラのボタン" width={65} height={65} />
          <Image src={fot} alt="カメラのボタン" width={65} height={65} />
        </div>
      </div>
    </>
  );
};
