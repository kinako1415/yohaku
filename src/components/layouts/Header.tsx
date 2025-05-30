"use client";

import style from "./Header.module.scss";
import icon from "../../assets/icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  return (
    <>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.header}>余白カレンダー</div>
          <Image
            onClick={() => {
              router.push("./myPage");
            }}
            src={icon}
            alt="icon"
            width={40}
            height={40}
          />
        </div>
      </div>
    </>
  );
};
