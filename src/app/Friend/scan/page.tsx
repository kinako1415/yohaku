import React from "react";
import { QrScan } from "./components/qrScan";
import Image from "next/image";
import icon from "@/assets/QrpageYohaku.svg"; // Adjust the path as necessary
import light from "@/assets/light.svg"; // Adjust the path as necessary
import style from "./index.module.scss"; // Adjust the path as necessary

export default function Page() {
  return (
    <div className={style.container}>
      {/* <div className={style.img}>
        <Image src={icon} alt="QR Scan" width={300} height={200} />
      </div> */}

      <div className={style.text}>
        <h3 className={style.title}>
          フレンドQR を<br />
          よみとってください
        </h3>
      </div>
      <QrScan />
      {/* <div className={style.text}>
        <Image src={light} alt="カメラ" width={50} height={50} />
      </div> */}
    </div>
  );
}
