"use client";

import style from "./Footer.module.scss";
import Image from "next/image";
import homeIcon from "../../assets/navItem.svg";
import postIcon from "../../assets/Post.svg";
import friendIcon from "../../assets/friend.svg";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();

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
            onClick={() => {
              router.push("/");
            }}
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
            onClick={() => {
              router.push("./friend");
            }}
          />
        </div>
      </div>
    </>
  );
};
