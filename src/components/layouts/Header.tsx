"use client";

import style from "./Header.module.scss"
import icon from "../../assets/icon.svg"
import Image from "next/image";


export const Header = () => {
	return (
    <>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.header}>余白カレンダー</div>
          <Image src={icon} alt="icon" width={40} height={40} />
        </div>
      </div>
    </>
  );
};

