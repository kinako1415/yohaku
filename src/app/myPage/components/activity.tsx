import React from "react";
import style from "./activity.module.scss";

// Define the possible width types
type ActivityWidth = "sm" | "lg";

type ActivityProps = {
  day: string;
  time: string;
  title: string;
  detail: string;
  match: number;
  isMatch?: boolean;
  width?: ActivityWidth; // Make width optional
};

export const Activity: React.FC<ActivityProps> = (props) => {
  const { time, day, title, match, isMatch, width } = props;

  const activityClasses = `${
    width === "sm" ? style.smWidth : width === "lg" ? style.lgWidth : ""
  }`;

  return (
    <div className={`${style.content} ${activityClasses}`}>
      <div className={style.times}>
        <p className={style.day}>{day}</p>
        <p className={style.time}>{time}</p>
      </div>
      <div className={style.text}>
        <h4 className={style.title}>{title}</h4>
        {isMatch && <p className={style.match}>{match}とマッチ</p>}
      </div>
    </div>
  );
};
