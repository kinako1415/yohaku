import { Activity } from "./components/activity";
import style from "./index.module.scss";

export default function Page() {
  return (
    <>
      <div className={style.content}>
        <h3>📅 最近のアクティビティ</h3>
        <div className={style.activity}>
          <Activity />
        </div>
      </div>
    </>
  );
}
