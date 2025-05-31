import style from "./index.module.scss";

import Image from "next/image";
import icon from "@/assets/userIcon.svg";

export default function Page() {
  return (
    <>
      <div className={style.userIcon}>
        <Image src={icon} alt="userIcon" width={130} height={130} />
      </div>
    </>
  );
}
