import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { useState, useMemo, useCallback } from "react";


dayjs.locale(ja);

export const useCalender = () => {

  const [selectedMonth, setSelectedMonth] = useState<dayjs.Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  //前月に移動
  const handlePrevMonth = useCallback(() => {
    setSelectedMonth(selectedMonth.subtract(1, "month"));
  }, [selectedMonth]);

  //次月に移動
  const handleNextMonth = useCallback(() => {
    setSelectedMonth(selectedMonth.add(1, "month"));
  }, [selectedMonth]);

  // 表示している月の日数を取得
  const daysInMonth = selectedMonth.daysInMonth();
  // 表示している月の年を取得
  const selectedYear = selectedMonth.year();

  // 表示している月の日数分配列を作成する
  const selectedMonthDateList = Array.from({ length: daysInMonth }, (_, i) =>
    selectedMonth.startOf("month").add(i, "day")
  );

  // 日付を選択したときの処理
  const handleSelectDate = useCallback(
    (date: dayjs.Dayjs) => {
      setSelectedDate(dayjs(date).startOf("day"));

      // 選択した日が表示している月の初日より前の場合は、前月に移動する
      if (date.isBefore(selectedMonth.startOf("month"))) {
        handlePrevMonth();
      }

      // 選択した日が表示している月の最終日より後の場合は、次月に移動する
      if (date.isAfter(selectedMonth.endOf("month"))) {
        handleNextMonth();
      }
    },
    [selectedMonth, handlePrevMonth, handleNextMonth]
  );

  // 表示している月の初日の曜日を取得
  const selectedMonthStartDay = selectedMonth.startOf("month").day();

  // 表示している月の最後の曜日を取得
  const selectedMonthEndDay = selectedMonth.endOf("month").day();

  // 表示している月の最初の日の曜日と、日曜日までの差を計算し、その差の数だけ前月の日を取得
  const prevMonthDateList = Array.from(
    { length: selectedMonthStartDay },
    (_, i) => selectedMonth.startOf("month").subtract(i + 1, "day")
  ).reverse();
  //.reverse()並びを日付の昇順

  // 日曜日基準なので、週の最後の曜日（土曜日）を表す6を定義
  const LAST_DAY_OF_WEEK_INDEX = 6;

  // 表示している月の最終日の曜日と、土曜日までの差を計算し、その差の数だけ次月の日を取得
  const nextMonthDateList = Array.from(
    {
      length: LAST_DAY_OF_WEEK_INDEX - selectedMonthEndDay,
    },
    (_, i) => selectedMonth.endOf("month").add(i + 1, "day")
  );
  //曜日始まり 週を取得
  const selectedWeekList = useMemo(() => {
    const weekStart = selectedDate.startOf("week");
    return Array.from({ length: 7 }, (_, i) => weekStart.add(i, "day"));
  }, [selectedDate]);

  // 前月、当月、次月の日付を結合し、週ごとに分ける
  const calenderData = useMemo(() => {
    const weeklyCalendarData = Object.values(
      [
        ...prevMonthDateList,
        ...selectedMonthDateList,
        ...nextMonthDateList,
      ].reduce((acc, date, index) => {
        const weekIndex = Math.floor(index / 7);

        return {
          ...acc,
          [weekIndex]: [...(acc[weekIndex] ?? []), date],
        };
      }, [] as dayjs.Dayjs[][])
    );

    return weeklyCalendarData;
  }, [prevMonthDateList, selectedMonthDateList, nextMonthDateList]);

  return {
    selectedYear,
    selectedMonth,
    selectedDate,
    calenderData,
    selectedWeekList,
    handlePrevMonth,
    handleNextMonth,
    handleSelectDate,
  };
}

