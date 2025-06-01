import style from "./AllowButton.module.scss";
import { Button } from "@/components/elements/Button";

export const AllowButton = () => {
  return (
    <>
      <div className={style.content}>
        <div className={style.apply}>
          <Button size="sm">許可</Button>
          <Button size="sm">拒否</Button>
        </div>
      </div>
    </>
  );
};
