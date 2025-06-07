import { getAllUsers } from "@/actions/user/getAllUsers";
import { HomeCalendar } from "./home/component/HomeCalendar";
import { User } from "@/types";

export default async function Home() {
  const users: User[] = await getAllUsers();
  console.log("Fetched users:", users);
  return (
    <div>
      <HomeCalendar />
    </div>
  );
}
