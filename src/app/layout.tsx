import "./globals.css";

import ConditionalHeader from "./ConditionalHeader";
import ConditionalFooter from "./ConditionalFooter";

import { Noto_Sans_Javanese } from "next/font/google";

const NotoSansJP = Noto_Sans_Javanese({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={NotoSansJP.className}>
        <ConditionalHeader />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
