"use client";

import style from "./Calendar.module.scss";
import { FC } from "react";

import { useCalender } from "../../home/component/useCalender";
import { IconButton } from "@/components/elements/IconButton";


export const Calendar: FC = () => {
  const {
    selectedMonth,
    selectedDate,
    calenderData,
    handlePrevMonth,
    handleNextMonth,
    handleSelectDate,
  } = useCalender();

  return (
    <div className={style.content}>
      <div className={style.header}>
        <div className={style.PrevMonthButton}>
          <IconButton
            size="sm"
            icon="https://api.iconify.design/heroicons:chevron-left-20-solid.svg?color=%2322c55e"
            alt="前月"
            onClick={handlePrevMonth}
          />
        </div>
        <span className={style.month}>{selectedMonth.format("M月")}</span>
        <div className={style.NextMonthButton}>
          <IconButton
            size="sm"
            icon="https://api.iconify.design/heroicons:chevron-right-20-solid.svg?color=%2322c55e"
            alt="次月"
            onClick={handleNextMonth}
          />
        </div>
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
          {calenderData.map((calendar, index) => (
            <tr key={index} className={style.mainCols}>
              {calendar.map((date, index) => (
                <td key={index} className={style.mainTh}>
                  <button
                    onClick={() => handleSelectDate(date)}
                    className={`
											${style.day} 
											${date.isSame(selectedDate, "day") ? style.selectedDay : ""}
											${date.month() !== selectedMonth.month() ? style.outside : ""}
                    `}
                  >
                    {date.date()}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* 選択された日にち情報を表示 */}
      {/* 選択された日: {dayjs(selectedDate).format("YYYY年M月D日")} */}
    </div>
  );
};
