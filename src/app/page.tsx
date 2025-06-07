import { getUserById } from "@/actions/user/getUserById";
import { HomeCalendar } from "./home/component/HomeCalendar";
import { User } from "@/types";

export default async function Home() {
  const user: User = await getUserById("SctU5ffUnAhX7VMtbWuA");
  console.log("Fetched users:", user);
  return (
    <div>
      <HomeCalendar />
    </div>
  );
}
