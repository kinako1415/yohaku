"use client";

import { PostYohakuAtom } from "@/store/PostedYohaku";
import { useAtom } from "jotai";
import { RecruitmentCard } from "./RecruitmentCard";
import { useEffect, useState } from "react";
import { getYohakuById } from "@/actions/yohaku/getYohakuById";
import { Yohaku } from "@/types";
import { loginUserAtom } from "@/store/loginUser";

export const ShowRecruitmentCard = () => {
  const [yohakuList] = useAtom(PostYohakuAtom);
  const [yohakuDetails, setYohakuDetails] = useState<Yohaku[]>([]);
  const [user] = useAtom(loginUserAtom);
  const [deleteYohaku, setDeleteYohaku] = useState<string | null>(null);

  useEffect(() => {
    const fetchYohakuDetails = async () => {
      const details = await Promise.all(
        yohakuList.map(async (item) => {
          const data = await getYohakuById(item.yohakuId);
          return data;
        })
      );
      setYohakuDetails(details.filter((d): d is Yohaku => d !== null));
    };

    if (yohakuList.length > 0) {
      fetchYohakuDetails();
    }
  }, [yohakuList, deleteYohaku]);

  // 自分が募集したものだけフィルタ
  const myYohakuDetails = yohakuDetails.filter(
    (activity) => activity.author.userId === user?.userId
  );

  const onDelete = (yohakuId: string) => {
    setDeleteYohaku(yohakuId);
  };

  return (
    <>
      {myYohakuDetails.length === 0 ? (
        <p>募集してるyohakuがありません</p>
      ) : (
        myYohakuDetails.map((activity) => {
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

          return (
            <RecruitmentCard
              key={activity.yohakuId}
              day={day}
              time={time}
              place={activity.place}
              icon={activity.participants}
              yohakuId={activity.yohakuId}
              onDelete={onDelete}
            />
          );
        })
      )}
    </>
  );
};
