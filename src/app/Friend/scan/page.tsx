import React from "react";
import { QrScan } from "./components/qrScan";
import style from "./index.module.scss"; // Adjust the path as necessary
import { Noto_Sans_Javanese } from "next/font/google";

const NotoSansJavanese = Noto_Sans_Javanese({
  weight: "400",
  subsets: ["latin"],
});

export default function Page() {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h2 className={style.title}>
          フレンドQR を<br />
          よみとってください
        </h2>
        <div>
          <div className={NotoSansJavanese.className}>
            <p className={style.detail}>
              このQRコードを読み取ることで、簡単に友達を追加できます。対面での友達追加やイベント時の連絡先交換にご活用ください。
            </p>
          </div>
        </div>
      </div>
      <QrScan />
    </div>
  );
}
