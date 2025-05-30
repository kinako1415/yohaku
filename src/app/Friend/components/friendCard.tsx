
import { Apply } from "./apply";
import style from "./friendCard.module.scss";
import Image from "next/image";

type FriendProps = {
  name: string;
  userIcon: string;
  isApply: boolean;
};
export const FriendCard: React.FC<FriendProps> = (props) => {
  const { name, userIcon, isApply } = props;
  return (
    <>
      <div className={style.content}>
        <Image src={userIcon} alt="userIcon" width={40} height={40} />
        <p className={style.userName}>{name}</p>
        <div className={style.apply}>{isApply ? <Apply /> : null}</div>
      </div>
    </>
  );
};
