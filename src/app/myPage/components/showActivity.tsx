"use client";

import { useAtom } from "jotai";
import { Activity } from "./activity";
import { PostYohakuAtom } from "@/store/PostedYohaku";

type props = {
  isMatch: boolean;
};

export const ShowActivity: React.FC<props> = ({ isMatch }) => {
  const [yohaku] = useAtom(PostYohakuAtom);
  return (
    <>
      {yohaku.map((activity) => {
        const start = new Date(activity.startDate);
        const end = new Date(activity.endDate);

        const day = `${start.getMonth() + 1}/${start.getDate()}`; // 例: "6/8"

        const time = `${start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}-${end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`; // 例: "14:00 - 15:30"

        const matchCount = activity.author.userId.length || 0;

        return (
          <Activity
            key={activity.yohakuId}
            day={day}
            time={time}
            title={activity.title}
            match={matchCount}
            width={isMatch ? "lg" : "sm"}
            isMatch={isMatch}
          />
        );
      })}
    </>
  );
};
