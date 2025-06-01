"use client";

import style from "./Header.module.scss";
import icon from "../../assets/icon.svg";
import Image from "next/image";
import settingIcon from "@/assets/Menu.svg";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const hideOn = ["/myPage"];
  const shouldShow = !hideOn.includes(pathname);

  return (
    <>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.header}>余白カレンダー</div>
          {shouldShow ? (
            <Link href="/myPage">
              <Image src={icon} alt="icon" width={40} height={40} />
            </Link>
          ) : (
            <Link href="/myPage/setting">
              <Image src={settingIcon} alt="icon" width={40} height={40} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
