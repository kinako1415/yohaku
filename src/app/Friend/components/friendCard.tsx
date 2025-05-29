"use client";

import style from "./friendCard.module.scss";
import Image from "next/image";

type FriendProps = {
  name: string;
  userIcon: string;
};
export const FriendCard: React.FC<FriendProps> = (props) => {
  const { name, userIcon } = props;
  return (
    <>
      <div className={style.content}>
        <Image src={userIcon} alt="userIcon" width={40} height={40} />
        <p className={style.userName}>{name}</p>
      </div>
    </>
  );
};
