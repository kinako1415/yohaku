"use client";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layouts/Footer";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hideOn = ["/signin", "/signup,", "/myPage/setting"];
  const shouldShow = !hideOn.includes(pathname);

  return shouldShow ? <Footer /> : null;
}
