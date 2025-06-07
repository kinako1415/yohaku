import { HomeCalendar } from "./home/component/HomeCalendar";
import { getAllYohakus } from "@/actions/yohaku/getAllYohakus";

export default async function Home() {
  const yohakus = await getAllYohakus();
  return (
    <>
      <HomeCalendar yohakus={yohakus} />
    </>
  );
}
