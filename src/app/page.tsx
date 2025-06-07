import { HomeCalendar } from "./home/component/HomeCalendar";
import { getAllYohakus } from "@/actions/yohaku/getAllYohakus";

export default async function Home() {
  const yohakuData = await getAllYohakus();
  console.log("aaa", yohakuData);

  return (
    <div>
      <HomeCalendar />
    </div>
  );
}
