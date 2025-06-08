import { UserProfile } from "./components/UserProfile";
import style from "./index.module.scss";
import Image from "next/image";
import icon from "@/assets/yahakuIcon.svg";
import { ShowActivity } from "./components/showActivity";
import { ShowRecruitmentCard } from "./components/showRecruitmentCard";

export default function Page() {
  return (
    <div className={style.content}>
      <div className={style.profile}>
        <UserProfile />
      </div>

      <div>
        <h3 className={style.joinTitle}>
          <Image src={icon} alt="yohaku icon" width={24} height={24} />
          Yo haku募集中!!
        </h3>
        <div className={style.joinActivity}>
          <ShowRecruitmentCard />
        </div>
      </div>

      <div>
        <h3>📅 参加予定</h3>
        <div className={style.joinActivity}>
          <ShowActivity isMatch={false} />
        </div>
      </div>

      <div>
        <h3>🔥 最近のアクティビティ</h3>
        <ShowActivity isMatch={true} />
      </div>
    </div>
  );
}
