import style from "./index.module.scss";

import Image from "next/image";
import icon from "@/assets/userIcon.svg";
import change from "@/assets/change.svg";
import { SettingInput } from "./components/settingInput";

export default function Page() {
  return (
    <>
      <div className={style.content}>
        <div className={style.userIcon}>
          <Image src={icon} alt="userIcon" width={130} height={130} />
          <Image
            className={style.change}
            style={{ cursor: "pointer" }}
            src={change}
            alt="userIcon"
            width={100}
            height={50}
          />
        </div>
        <div className={style.inputName}>
          <h4>ニックネーム</h4>
          <SettingInput placeholder="yuki_cafe" />
        </div>
        <div className={style.inputProfile}>
          <h4>一言自己紹介</h4>
          <SettingInput placeholder="夕方よくカフェにいます☕️" />
        </div>
      </div>
    </>
  );
}
