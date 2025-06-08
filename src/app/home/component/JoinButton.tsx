import { Button } from "@/components/elements/Button";
import { useRouter } from "next/navigation";

export const JoinButton = () => {
  const router = useRouter();

  const handleJoin = () => {
    router.push("/message");
  };

  return (
    <Button type="submit"  onClick={handleJoin}>
      参加する
    </Button>
  );
};
