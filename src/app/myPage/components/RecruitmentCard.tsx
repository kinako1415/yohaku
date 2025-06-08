"use client";

import style from "./RecruitmentCard.module.scss";
import deleteIcon from "@/assets/Delete.svg";
import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import { YohakuParticipant } from "@/types";
import yohaku from "@/assets/Frame.svg";
import userIcn from "@/assets/userIcon.svg";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const getRelativeDayFromString = (dayString: string) => {
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

type Activity = {
  day: string;
  time: string;
  place?: string;
  icon: YohakuParticipant[];
};

export const RecruitmentCard: React.FC<Activity> = (props) => {
  const { time, day, place, icon } = props;

  const formattedDay = getRelativeDayFromString(day);

  return (
    <>
      <div className={style.content}>
        <div className={style.iconWrapper}>
          <Image
            className={style.icon}
            src={yohaku}
            alt="余白のアイコン"
            width={130}
            height={150}
          />
        </div>
        <div className={style.titleWrapper}>
          <div className={inter.className} style={{ zIndex: 100 }}>
            <h4 className={style.title}>
              {formattedDay}：{time} / {place}
            </h4>
          </div>
          <Image
            src={deleteIcon}
            alt="削除"
            width={30}
            height={30}
            className={style.deleteIcon}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={style.entrantList}>
          {icon.map((entrant, index) => (
            <div key={index} className={style.entrant}>
              <Image
                src={entrant.avatar || userIcn} // プロパティ名に応じて修正
                alt="ユーザーアイコン"
                style={{
                  marginLeft: index === 0 ? 0 : "-8px",
                }}
                width={35}
                height={35}
                className={style.userIcon}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
