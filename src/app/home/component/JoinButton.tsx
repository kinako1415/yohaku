import { Button } from "@/components/elements/Button";
import style from "./JoinButton.module.scss";
import { useRouter } from "next/navigation";

export const JoinButton = () => {
  const router = useRouter();

  const handleJoin = () => {
    router.push("/message");
  };

  return (
    <Button type="submit" className={style.button} onClick={handleJoin}>
      参加する
    </Button>
  );
};
