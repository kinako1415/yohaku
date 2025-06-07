"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layouts/Header";
import { loginUserAtom } from "@/store/loginUser";
import { useAtom } from "jotai";

export default function ConditionalHeader() {
  const pathname = usePathname();

  const [user] = useAtom(loginUserAtom);
  const userIcon = user?.avatar;

  // 非表示にしたいパス
  const hideOn = ["/signin", "/signup", "/friend/scan"];
  const shouldShow = !hideOn.includes(pathname);

  // 表示するタイトルをパスによって切り替える
  const getTitle = () => {
    if (pathname === "/myPage") return "マイページ";
    if (pathname === "/myPage/setting") return "プロフィール編集";
    if (pathname === "/friend") return "フレンド";
    if (pathname === "/message") return "メッセージ";
    if (/^\/friend\/[^/]+\/?$/.test(pathname)) {
      return "QRコード / ID検索";
    }
    if (pathname === "/post") return "新規投稿";
    return "余白カレンダー";
  };

  const shouldShowBackButton = () => {
    const segments = pathname.split("/").filter(Boolean);
    const isMyPage = pathname === "/myPage";
    return segments.length >= 2 || isMyPage;
  };

  return shouldShow ? (
    <Header
      title={getTitle()}
      isCheck={shouldShowBackButton()}
      pathname={pathname}
      userIcon={userIcon}
    />
  ) : null;
}
