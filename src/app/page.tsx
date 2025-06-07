import { HomeCalendar } from "./home/component/HomeCalendar";
import { getAllYohakus } from "@/actions/yohaku/getAllYohakus";

export default async function Home() {
<<<<<<< HEAD
  const yohakus = await getAllYohakus();
  return (
    <>
      <HomeCalendar yohakus={yohakus} />
    </>
=======
  const yohakuData = await getAllYohakus();
  console.log("aaa", yohakuData);

  return (
    <div>
      <HomeCalendar />
    </div>
>>>>>>> 428289e034c692f596540996605fdfb5c8c19a6c
  );
}
