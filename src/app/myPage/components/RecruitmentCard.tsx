"use client";

import style from "./RecruitmentCard.module.scss";
import deleteIcon from "@/assets/Delete.svg";
import Image from "next/image";

type Activity = {
  day: string;
  time: string;
  title: string;
  detail: string;
  match: number;
  isMatch?: boolean;
  place?: string;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const getRelativeDayFromString = (dayString: string): string => {
  const [monthStr, dateStr] = dayString.split("/");
  const currentYear = new Date().getFullYear();

  const targetDate = new Date(
    currentYear,
    parseInt(monthStr) - 1,
    parseInt(dateStr)
  );

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const compareTargetDate = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  if (isSameDay(compareTargetDate, today)) {
    return "今日";
  } else if (isSameDay(compareTargetDate, tomorrow)) {
    return "明日";
  } else if (isSameDay(compareTargetDate, dayAfterTomorrow)) {
    return "明後日";
  } else {
    return dayString;
  }
};

export const RecruitmentCard: React.FC<Activity> = (props) => {
  const { time, day, title, detail, match, isMatch, place } = props;

  const formattedDay = getRelativeDayFromString(day);

  return (
    <>
      <div className={style.content}>
        <div className={style.titleWrapper}>
          <h4 className={style.title}>
            🟢 {formattedDay}：{time} / 📍{place}
          </h4>
          <Image
            src={deleteIcon}
            alt="削除"
            width={28}
            height={28}
            className={style.deleteIcon}
            style={{ cursor: "pointer" }}
          />
        </div>
        <p className={style.detail}>{detail}</p>
      </div>
    </>
  );
};
