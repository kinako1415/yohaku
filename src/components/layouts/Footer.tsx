"use client";

import style from "./Footer.module.scss";
import Image from "next/image";
import homeIcon from "./navItem.svg";
import postIcon from "./Post.svg";

export const Footer = () => {
  return (
    <>
      <div className={style.border}>
        <div className={style.content}>
          <Image
            className={style.homeImg}
            src={homeIcon}
            alt="ホームの画像"
            width={70}
            height={70}
          />
          <Image
            className={style.homeImg}
            src={postIcon}
            alt="ホームの画像"
            width={70}
            height={70}
          />
          <Image
            className={style.homeImg}
            src={postIcon}
            alt="ホームの画像"
            width={70}
            height={70}
          />
        </div>
      </div>
    </>
  );
};
