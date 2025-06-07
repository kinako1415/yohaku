import style from "./index.module.scss";

import { ChangeImage } from "./components/changeImage";
import { SettingInput } from "./components/settingInput";
import { Button } from "@/components/elements/Button";

export default function Page() {
  return (
    <>
      <div className={style.content}>
        <ChangeImage />
        <div className={style.inputName}>
          <h4>ニックネーム</h4>
          <SettingInput placeholder="yuki_cafe" isArea={false} />
        </div>
        <div className={style.inputProfile}>
          <h4>一言自己紹介</h4>
          <SettingInput placeholder="夕方よくカフェにいます☕️" isArea={true} />
          <p className={style.text}>50文字以内で簡潔に</p>
        </div>
        <div className={style.button}>
          <Button>保存</Button> 
        </div>
      </div>
    </>
  );
}
