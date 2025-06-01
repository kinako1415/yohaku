import { AllowButton } from "./AllowButton";
import { Apply } from "./apply";
import style from "./friendCard.module.scss";
import Image from "next/image";

type FriendProps = {
  name: string;
  userIcon: string;
  isApply: boolean;
  isAllow: boolean;
};

export const FriendCard: React.FC<FriendProps> = (props) => {
  const { name, userIcon, isApply, isAllow } = props;
  return (
    <div className={style.content}>
      <Image src={userIcon} alt="userIcon" width={40} height={40} />
      <p className={style.userName}>{name}</p>

      {isApply && (
        <div className={style.applyContainer}>
          <Apply />
        </div>
      )}

      {isAllow && (
        <div className={style.allowContainer}>
          <AllowButton />
        </div>
      )}
    </div>
  );
};
