import style from "./index.module.scss";

import { ChangeImage } from "./components/changeImage";
import { SettingInput } from "./components/settingInput";

export default function Page() {
  return (
    <>
      <div className={style.content}>
        <ChangeImage />
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
