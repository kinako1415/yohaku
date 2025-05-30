"use client";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layouts/Footer";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hideOn = ["/login", "/signup"];
  const shouldShow = !hideOn.includes(pathname);

  return shouldShow ? <Footer /> : null;
}
