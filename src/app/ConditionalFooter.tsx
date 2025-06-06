"use client";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layouts/Footer";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hideOn = [
    "/signin",
    "/signup",
    "/myPage/setting",
    "/friend/scan",
    "/message",
  ];
  const shouldShow = !hideOn.includes(pathname);

  return shouldShow ? <Footer /> : null;
}
