import { Button } from "@/components/elements/Button";
import style from "./JoinButton.module.scss";

// const handleJoin = 

export const JoinButton = () => {
	return (
    <Button type="submit"  className={style.button}>
      {/* onClick={handleJoin} */}
      参加する
    </Button>
  );
}