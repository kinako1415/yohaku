"use client";

import style from "./Footer.module.scss";
import Image from "next/image";
import homeIcon from "./navItem.svg";
import postIcon from "./Post.svg";
import friendIcon from "./friend.svg";

export const Footer = () => {
  return (
    <>
      <div className={style.border}>
        <div className={style.content}>
          <Image
            className={style.homeImg}
            src={homeIcon}
            alt="ホームの画像"
            width={100}
            height={100}
          />
          <Image
            className={style.homeImg}
            src={postIcon}
            alt="ホームの画像"
            width={100}
            height={100}
          />
          <Image
            className={style.homeImg}
            src={friendIcon}
            alt="ホームの画像"
            width={100}
            height={100}
          />
        </div>
      </div>
    </>
  );
};
