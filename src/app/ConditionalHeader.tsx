"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layouts/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hideOn = ["/signin", "/signup"];
  const shouldShow = !hideOn.includes(pathname);

  return shouldShow ? <Header /> : null;
}
