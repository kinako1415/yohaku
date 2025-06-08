import { FriendCard } from "./components/friendCard";
import { Select } from "./components/select";
import style from "./index.module.scss";
import tomatoIcon from "@/assets/tomatoIcon.svg";

const friendList: Friend[] = [
  {
    uid: 1,
    name: "sana",
    userIcon:
      "https://lh3.googleusercontent.com/a/ACg8ocKOUK6Hpi2gsNdYE62g_AVAZqLZYdw0-7rZH8ynQq7TjPMKLEzQ=s96-c",
  },
  { uid: 2, name: "tomato", userIcon: tomatoIcon },
  {
    uid: 3,
    name: "koto",
    userIcon:
      "https://lh3.googleusercontent.com/a/ACg8ocIp3N9SKIKmUcpv_FFG773DhMdRlmtkuDl-PhuOMxeq1Z8ZBA=s96-c",
  },
  {
    uid: 4,
    name: "rin",
    userIcon:
      "https://lh3.googleusercontent.com/a/ACg8ocI-NVwyhSSCCfaMyi8HoOGk6wVQE_C5afV0M-PdIIF_IOh8hg=s96-c",
  },
  {
    uid: 5,
    name: "yui",
    userIcon:
      "https://iconbu.com/wp-content/uploads/2023/08/%E6%A2%A8%E3%81%AE%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88.jpg",
  },
  {
    uid: 6,
    name: "haru",
    userIcon:
      "https://iconbu.com/wp-content/uploads/2020/09/%E3%82%8A%E3%82%93%E3%81%94%E3%81%95%E3%82%93.jpg",
  },
  {
    uid: 7,
    name: "momo",
    userIcon:
      "https://iconbu.com/wp-content/uploads/2022/06/%E3%82%8A%E3%82%93%E3%81%94%E3%81%A8%E7%99%BD%E7%8C%AB%E3%81%95%E3%82%93.jpg",
  },
  {
    uid: 8,
    name: "sou",
    userIcon:
      "https://iconbu.com/wp-content/uploads/2022/01/%E5%94%90%E8%8D%89%E3%81%AD%E3%81%93%E3%81%95%E3%82%93.jpg",
  },
  {
    uid: 9,
    name: "aoi",
    userIcon:
      "https://iconbu.com/wp-content/uploads/2022/02/%E3%81%84%E3%81%A1%E3%81%94%E3%81%A8%E3%81%AD%E3%81%93%E3%81%95%E3%82%93.jpg",
  },
];

type Friend = {
  uid: number;
  name: string;
  userIcon: string;
};

export default function Page() {
  return (
    <>
      <Select />
      <div className={style.wrapper}>
        <h2>現在のフレンド</h2>
        <div className={style.content}>
          {friendList.map((friend) => (
            <FriendCard
              key={friend.uid}
              name={friend.name}
              userIcon={friend.userIcon}
              isApply={false}
              isAllow={false}
            />
          ))}
        </div>
      </div>
    </>
  );
}
