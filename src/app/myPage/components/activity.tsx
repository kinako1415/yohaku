import style from "./activity.module.scss";

type Activity = {
  day: string;
  time: string;
  title: string;
  detail: string;
  match: number;
};

export const Activity: React.FC<Activity> = (props) => {
  const { time, day, title, detail, match } = props;
  return (
    <>
      <div className={style.content}>
        <div className={style.times}>
          <p className={style.day}>{day}</p>
          <p className={style.time}>{time}</p>
        </div>
        <div className={style.text}>
          <h4 className={style.title}>{title}</h4>
          <p className={style.detail}>{detail}</p>
          <p className={style.match}>{match}とマッチ</p>
        </div>
      </div>
    </>
  );
};
