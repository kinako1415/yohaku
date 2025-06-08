"use client";

import style from "./HomeCalendar.module.scss";
import { FC, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

import { useCalender } from "./useCalender";
import { JoinButton } from "./JoinButton";
import icon from "@/assets/userIcon.svg";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom } from "jotai";
import { PostYohakuAtom } from "@/store/PostedYohaku";
import { Yohaku } from "@/types";

interface Props {
  yohakus: Yohaku[];
}

export const HomeCalendar: FC<Props> = ({ yohakus }) => {
  // デバッグ用：propsで受け取ったyohakusをコンソールに出力

  const [yohakuData, setYohakuData] = useAtom<Yohaku[]>(PostYohakuAtom);

  useEffect(() => {
    setYohakuData(yohakus);
  }, []);


  type props = {
    getYohakuData: Yohaku[] | null;
  };

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

  const selectedYohakus = yohakuData.filter(
    (yohaku) =>
      dayjs(yohaku.startDate).format("YYYY-MM-DD") ===
      dayjs(selectedDate).format("YYYY-MM-DD")
  );

  // 指定した日付に予定があるかチェックする関数
  const hasYohakuOnDate = (date: dayjs.Dayjs): boolean => {
    return yohakuData.some(
      (yohaku) =>
        dayjs(yohaku.startDate).format("YYYY-MM-DD") ===
        date.format("YYYY-MM-DD")
    );
  };


  return (
    <div className={style.content}>
      <div className={style.header}>
        <div className={style.headerleft}>
          <div className={style.PrevMonthButton}>
            <button onClick={movePrevMonth} className={style.prevButton}>
              <Icon
                icon="heroicons:chevron-left-20-solid"
                color="#22c55e"
                width={24}
                height={24}
              />
            </button>
          </div>
          <span className={style.month}>{selectedMonth.format("M月")}</span>
          <div className={style.NextMonthButton}>
            <button onClick={moveNextMonth} className={style.nextButton}>
              <Icon
                icon="heroicons:chevron-right-20-solid"
                color="#22c55e"
                width={24}
                height={24}
              />
            </button>
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
                      ${hasYohakuOnDate(date) ? style.hasYohaku : ""}
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
                        ${
                          date.isSame(selectedDate, "day")
                            ? style.selectedDay
                            : ""
                        }
                        ${date.isSame(now, "day") ? style.selectedToDay : ""}
                        ${
                          date.month() !== selectedMonth.month()
                            ? style.outside
                            : ""
                        }
                        ${hasYohakuOnDate(date) ? style.hasYohaku : ""}
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
          {dayjs(selectedDate).format("M月D日")}の
          <span className={style.span}>Yo haku</span>
        </div>
        {selectedYohakus.length > 0 ? (
          <div className={style.detailsList}>
            {selectedYohakus.map((yohaku, index) => {
              const user = yohaku.author;
              if (!user) return null;
              return (
                <div className={style.details} key={index}>
                  <div className={style.userInfo}>
                    <div className={style.icon}>
                      <Image
                        src={user.avatar || icon}
                        alt={`${user.name}のアイコン`}
                        width={32}
                        height={32}
                      />
                    </div>

                    <div className={style.textInfo}>
                      <div className={style.name}>{user.name}</div>
                      <div className={style.title}>{yohaku.title}</div>
                      <div className={style.time}>
                        {dayjs(yohaku.startDate).format("HH:mm")} -{" "}
                        {dayjs(yohaku.endDate).format("HH:mm")}
                      </div>
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
