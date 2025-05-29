"use client";

import style from "./Footer.module.scss";
import Image from "next/image";
import homeIcon from "../../assets/navItem.svg";
import postIcon from "../../assets/Post.svg";
import friendIcon from "../../assets/friend.svg";
import { usePathname, useRouter } from "next/navigation";

export const nav = [
  { id: 1, name: "ホームの画像", icon: homeIcon, url: "/" },
  { id: 2, name: "投稿の画像", icon: postIcon, url: "/post" },
  { id: 3, name: "フレンドの画像", icon: friendIcon, url: "/friend" },
];

export const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className={style.border}>
        <div className={style.content}>
          {nav.map((item) => {
            const isActive =
              pathname === item.url || pathname.startsWith(item.url + "/");

            return (
              <div
                key={item.id}
                className={style.iconWrapper}
                onClick={() => router.push(item.url)}
              >
                <div className={style.imageContainer}>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={50}
                    height={50}
                    className={`${style.homeImg} ${
                      isActive ? style.imgActive : ""
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
