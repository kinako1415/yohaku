import style from "./index.module.scss";

import Image from "next/image";

import icon from "@/assets/userIcon.svg";
import { Button } from "@/components/elements/Button";

export default function page() {
  return (
    <>
      <div className={style.content}>
        <div className={style.user}>
          <Image src={icon} alt="userのiconです" width={150} height={150} />
          <p className={style.userName}>sasaki_0</p>
        </div>
        <div className={style.container}>
          <div className={style.button}>
            <Button type="submit" size="lg">
              追加
            </Button>
          </div>

          <div
            className={`${style.circle} ${style.large} ${style.filled} ${style.topRight}`}
          ></div>
          <div
            className={`${style.circle} ${style.small} ${style.outlined} ${style.topLeft}`}
          ></div>
          <div
            className={`${style.circle} ${style.medium} ${style.filled} ${style.bottomLeft}`}
          ></div>
          <div
            className={`${style.circle} ${style.small} ${style.outlined} ${style.bottomCenter}`}
          ></div>
          <div
            className={`${style.circle} ${style.large} ${style.outlined} ${style.bottomRight}`}
          ></div>
        </div>
      </div>
    </>
  );
}
