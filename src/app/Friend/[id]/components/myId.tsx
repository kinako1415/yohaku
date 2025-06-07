"use client";

import { usePathname } from "next/navigation";
import style from "./myId.module.scss";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import copy from "@/assets/copy.svg";
import yohaku from "@/assets/yohaku.svg";
import { useEffect, useState } from "react";
import { FriendAdd } from "./friendAdd";

export const MyId = () => {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const userId = pathArr[pathArr.length - 1];

  const [copied, setCopied] = useState(false);

  //追加ボタンがあるリンクに飛ばす
  const profileUrl = `https://www.figma.com/design/bLlkKV8BA7aChp4pOEUSAU/Yo-haku?node-id=293-1080&t=5kzOVmQWoJHYIAQH-0`;

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
            fgColor="#1F2937" //QRコードの色
            level="H"
            imageSettings={{
              src: yohaku.src,
              height: 65,
              width: 65,
              excavate: true,
            }}
          />
        </div>
        <FriendAdd />
      </div>
    </>
  );
};
