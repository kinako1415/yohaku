"use client";

import style from "./cangeImage.module.scss";
import Image from "next/image";
import defaultUserIcon from "@/assets/userIcon.svg";
import icon from "@/assets/change.svg";
import { useRef, useState } from "react";
import { loginUserAtom } from "@/store/loginUser";
import { useAtom } from "jotai";

export const ChangeImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setCurrentImage] = useState(defaultUserIcon);
  const [user, setUser] = useAtom(loginUserAtom);

  const handleImageClick = () => {
    try {
      if (fileInputRef.current) {
        fileInputRef.current.click(); // ファイル入力要素をクリックしてファイル選択ダイアログを開く
      }
    } catch (error) {
      console.error("Error opening file dialog:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 選択されたファイルのURLを生成
      setCurrentImage(imageUrl);
    } else {
      setCurrentImage(defaultUserIcon); // ファイルが選択されなかった場合はデフォルトのアイコンに戻す
      console.error("ファイルが対応していないか、選択されていません。");
    }
  };


  return (
    <div className={style.userIcon}>
      <Image
        src={user?.name ?? defaultUserIcon}
        alt="userIcon"
        width={130}
        height={130}
        className={style.icon}
      />
      <Image
        className={style.change}
        style={{ cursor: "pointer" }}
        src={icon}
        alt="写真変更"
        width={100}
        height={50}
        onClick={handleImageClick} // クリックハンドラを追加
      />
      {/* 隠れたファイル入力要素 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange} // ファイルが選択されたときのハンドラ
      />
    </div>
  );
};
