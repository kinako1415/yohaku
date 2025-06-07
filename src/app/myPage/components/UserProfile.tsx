"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "@/libs/firebase";
import userIcon from "@/assets/userIcon.svg";
import style from "./UserProfile.module.scss";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/store/loginUser";
import { User } from "@/types";
import { getUserById } from "@/actions/user/getUserById";
import { onAuthStateChanged } from "firebase/auth";

export function UserProfile() {
  const [user, setUser] = useAtom<User | null>(loginUserAtom);
  const [uid, setUid] = useState<string>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log(uid);

  useEffect(() => {
    if (!uid) return;

    const fetchUser = async () => {
      try {
        const loginUserInfo = await getUserById(uid);
        setUser(loginUserInfo);

        console.log(loginUserInfo);
      } catch {
        console.log("ユーザー情報の取得に失敗しました");
      }
    };

    fetchUser();
  }, [uid]);

  return (
    <div className={style.profile}>
      <Image
        src={user?.avatar ?? userIcon}
        width={50}
        height={50}
        alt="userIconです"
        className={style.icon}
      />
      <p>
        <span className={style.title}>{user?.name}</span>
        <br />
        <span>coffeが好きだよ</span>
      </p>
    </div>
  );
}
