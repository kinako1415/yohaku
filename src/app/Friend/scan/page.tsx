import React from "react";
import { QrScan } from "./components/qrScan";
import style from "./index.module.scss"; // Adjust the path as necessary

export default function Page() {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h3 className={style.title}>
          フレンドQR を<br />
          よみとってください
        </h3>
      </div>
      <QrScan />
    </div>
  );
}
