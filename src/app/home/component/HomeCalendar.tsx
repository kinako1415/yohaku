"use client";

import style from "./HomeCalendar.module.scss";
import { FC, useCallback, useState } from "react";
import dayjs from "dayjs";

import { useCalender } from "./useCalender";
import { IconButton } from "@/components/elements/IconButton";
import { JoinButton } from "./JoinButton";
import icon from "@/assets/userIcon.svg";
import Image from "next/image";

const expectData: Shift[] = [
  {
    startedAt: "2025-06-10T10:00:00+09:00",
    endedAt: "2025-06-10T19:00:00+09:00",
    title: "夜ご飯ラーメン行こ！",
    uid: 1,
    room: {
      id: "1",
    },
  },
  {
    startedAt: "2025-06-12T11:00:00+09:00",
    endedAt: "2025-06-12T13:00:00+09:00",
    title: "今から渋谷でカフェ行きたい人いる？",
    uid: 2,
    room: {
      id: "2",
    },
  },
  {
    startedAt: "2025-06-13T17:00:00+09:00",
    endedAt: "2025-06-13T23:00:00+09:00",
    title:
      "夏休みディズニー行きたい人いる？ランドとシーどっちも行きたいなーって思ってるんだけどどうかな？あと三人くらいかな",
    uid: 3,
    room: {
      id: "3",
    },
  },
  {
    startedAt: "2025-06-13T10:00:00+09:00",
    endedAt: "2025-06-13T19:00:00+09:00",
    title:
      "美術館行かない？金山にある美術館なんだけど期間限定でゴッホ展がやっててすごく綺麗で写真映えしそうだからすごい気になってるんだけどよかったら誰か一緒に行きませんかー！",
    uid: 4,
    room: {
      id: "4",
    },
  },
];

const userList: User[] = [
  { uid: 1, name: "田中", userIcon: icon },
  { uid: 2, name: "佐藤", userIcon: icon },
  { uid: 3, name: "鈴木", userIcon: icon },
  { uid: 4, name: "山本", userIcon: icon },
];

type Shift = {
  startedAt: string;
  endedAt: string;
  title: string;
  uid: number;
  room: {
    id: string;
  };
};

type User = {
  uid: number;
  name: string;
  userIcon: string;
};

export const HomeCalendar: FC = () => {
  const {
    selectedMonth,
    selectedDate,
    calenderData,
    selectedWeekList,
    handlePrevMonth,
    handleNextMonth,
    handleSelectDate,
  } = useCalender();

  const moveNextMonth = useCallback(() => {
    handleNextMonth();
  }, [handleNextMonth]);

  const movePrevMonth = useCallback(() => {
    handlePrevMonth();
  }, [handlePrevMonth]);

  const [weekView, setWeekView] = useState(false);
  const now = dayjs();

  const selectedShifts = expectData.filter(
    (item) =>
      dayjs(item.startedAt).format("YYYY-MM-DD") ===
      dayjs(selectedDate).format("YYYY-MM-DD")
  );

  return (
    <div className={style.content}>
      <div className={style.header}>
        <div className={style.headerleft}>
          <div className={style.PrevMonthButton}>
            <IconButton
              size="sm"
              icon="https://api.iconify.design/heroicons:chevron-left-20-solid.svg?color=%2322c55e"
              onClick={movePrevMonth}
            />
          </div>
          <span className={style.month}>{selectedMonth.format("M月")}</span>
          <div className={style.NextMonthButton}>
            <IconButton
              size="sm"
              icon="https://api.iconify.design/heroicons:chevron-right-20-solid.svg?color=%2322c55e"
              onClick={moveNextMonth}
            />
          </div>
        </div>
        <button
          onClick={() => setWeekView(!weekView)}
          className={style.WeekButton}
        >
          {weekView ? (
            <Image
              src="https://api.iconify.design/heroicons:chevron-up-20-solid.svg?color=%2322c55e"
              alt="月表示切り替え"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="https://api.iconify.design/heroicons:chevron-down-20-solid.svg?color=%2322c55e"
              alt="週表示切り替え"
              width={20}
              height={20}
            />
          )}
        </button>
      </div>
      <table className={style.table}>
        <thead>
          <tr className={style.headerCols}>
            {["日", "月", "火", "水", "木", "金", "土"].map((day, index) => (
              <th
                key={index}
                className={`
								${style.headerTh}
								${index === 0 ? style.sundayHeader : ""}
								${index === 6 ? style.saturdayHeader : ""}
								`}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekView ? (
            <tr className={style.mainCols}>
              {selectedWeekList.map((date, index) => (
                <td key={index} className={style.mainTh}>
                  <button
                    onClick={() => handleSelectDate(date)}
                    className={`
											${style.day} 
											${date.isSame(selectedDate, "day") ? style.selectedDay : ""}
                      ${date.isSame(now, "day") ? style.selectedToDay : ""}
											${date.month() !== selectedMonth.month() ? style.outside : ""}
                    `}
                  >
                    {date.date()}
                  </button>
                </td>
              ))}
            </tr>
          ) : (
            calenderData.map((calendar, index) => (
              <tr key={index} className={style.mainCols}>
                {calendar.map((date, index) => (
                  <td key={index} className={style.mainTh}>
                    <button
                      onClick={() => handleSelectDate(date)}
                      className={`
											${style.day} 
											${date.isSame(selectedDate, "day") ? style.selectedDay : ""}
                      ${date.isSame(now, "day") ? style.selectedToDay : ""}
											${date.month() !== selectedMonth.month() ? style.outside : ""}
                    `}
                    >
                      {date.date()}
                    </button>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className={style.detailsContainer}>
        <div className={style.detailsDay}>
          {dayjs(selectedDate).format("M月D日")}の余白
        </div>
        {selectedShifts.length > 0 ? (
          <div className={style.detailsList}>
            {selectedShifts.map((shift, index) => {
              const user = userList.find((u) => u.uid === shift.uid);
              if (!user) return null;
              return (
                <div className={style.details} key={index}>
                  <div className={style.userInfo}>
                    <div className={style.icon}>
                      <Image
                        src={user.userIcon}
                        alt={`${user.name}のアイコン`}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className={style.textInfo}>
                      <div className={style.name}>{user.name}</div>
                      <div className={style.time}>
                        {dayjs(shift.startedAt).format("HH:mm")} -{" "}
                        {dayjs(shift.endedAt).format("HH:mm")}
                      </div>
                      <div className={style.title}>{shift.title}</div>
                    </div>
                  </div>
                  <div className={style.JoinButton}>
                    <JoinButton />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>予定はありません</p>
        )}
      </div>
    </div>
  );
};
