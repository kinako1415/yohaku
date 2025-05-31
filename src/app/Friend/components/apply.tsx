import style from "./apply.module.scss";
import Image from "next/image";
import icon from "@/assets/x.svg";

export const Apply = () => {
  return (
    <>
      <div className={style.content}>
        <div className={style.apply}>
          <p className={style.text}>申請中</p>
        </div>
        <Image src={icon} alt="x" width={20} height={20} />
      </div>
    </>
  );
};
