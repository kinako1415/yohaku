import style from "./Header.module.scss";
import icon from "../../assets/icon.svg";
import settingIcon from "@/assets/settingIcon.svg";
import Image from "next/image";
import backIcon from "@/assets/backButton.svg";
import Link from "next/link";

type HeaderProps = {
  title: string;
  isCheck?: boolean;
  pathname?: string;
  userIcon?: string;
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { title, isCheck, pathname, userIcon } = props;

  const isMyPage = pathname === "/myPage";
  return (
    <>
      <div className={style.container}>
        <div className={style.titleLeft}>
          {isCheck && (
            <div
              className={style.backButton}
              onClick={() => window.history.back()}
              style={{ cursor: "pointer" }}
            >
              <Image src={backIcon} alt="Back" width={24} height={24} />
            </div>
          )}
          <div className={style.header}>{title}</div>
        </div>

        <div />
        {isMyPage ? (
          <Link href="/myPage/setting">
            <Image
              className={style.icon}
              src={settingIcon}
              alt="icon"
              width={40}
              height={40}
            />
          </Link>
        ) : (
          <Link href="/myPage">
            <Image
              className={style.icon}
              src={userIcon ?? icon}
              alt="icon"
              width={40}
              height={40}
            />
          </Link>
        )}
      </div>
      <div className={style.space}/>
    </>
  );
};
