import { Activity } from "./components/activity";
import { RecruitmentCard } from "./components/RecruitmentCard";
import style from "./index.module.scss";

const activityList = [
  {
    day: "06/07",
    time: "15:00-17:00",
    title: "代々木公園でお散歩しませんか？",
    detail: "天気がいいのでお散歩しませんか",
    place: "代々木公園",
    match: 2,
  },
  {
    day: "12/14",
    time: "18:30-21:00",
    title: "渋谷でご飯でもどう？",
    detail: "新しくできたイタリアン行ってみたい！",
    place: "渋谷",
    match: 3,
  },
  {
    day: "12/16",
    time: "10:00-12:00",
    title: "朝カフェしながら読書会",
    detail: "代官山のカフェで静かに読書しましょう",
    place: "代官山",
    match: 1,
  },
  {
    day: "12/18",
    time: "13:00-16:00",
    title: "美術館に行きませんか？",
    detail: "上野の森美術館で開催中の展示を観に行こう",
    place: "上野",
    match: 4,
  },
];

export default function Page() {
  return (
    <>
      <div className={style.content}>
        <div>
          <h3>現在募集中</h3>
          <div className={style.joinActivity}>
            {activityList.map((activity, index) => (
              <RecruitmentCard
                key={index}
                day={activity.day}
                time={activity.time}
                title={activity.title}
                detail={activity.detail}
                match={activity.match}
                isMatch={false}
                place={activity.place}
              />
            ))}
          </div>
        </div>
        <div>
          <h3>📅 参加予定</h3>
          <div className={style.joinActivity}>
            {activityList.map((activity, index) => (
              <Activity
                key={index}
                day={activity.day}
                time={activity.time}
                title={activity.title}
                detail={activity.detail}
                match={activity.match}
                isMatch={false}
              />
            ))}
          </div>
        </div>

        <div>
          <h3>📅 最近のアクティビティ</h3>
          <div className={style.activity}>
            {activityList.map((activity, index) => (
              <Activity
                key={index}
                day={activity.day}
                time={activity.time}
                title={activity.title}
                detail={activity.detail}
                match={activity.match}
                isMatch={true}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
