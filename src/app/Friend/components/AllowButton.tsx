import style from "./AllowButton.module.scss";
import { Button } from "@/components/elements/Button";

export const AllowButton = () => {
  return (
    <>
      <div className={style.content}>
        <div className={style.apply}>
          <Button fullWidth={false} size="sm">
            許可
          </Button>
          <Button fullWidth={false} size="sm" color="gray">
            拒否
          </Button>
        </div>
      </div>
    </>
  );
};
