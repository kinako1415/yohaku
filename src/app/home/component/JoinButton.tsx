import { Button } from "@/components/elements/Button";
import { useRouter } from "next/navigation";

type Props = {
  handleJoin: () => void;
}

export const JoinButton: React.FC<Props> = ({ handleJoin }) => {
  return (
    <Button type="submit"  onClick={handleJoin}>
      参加する
    </Button>
  );
};
