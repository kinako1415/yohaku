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
      "https://lh3.googleusercontent.com/a/ACg8ocK7yuiProfilePic1=s96-c",
  },
  {
    uid: 6,
    name: "haru",
    userIcon: "https://lh3.googleusercontent.com/a/ACg8ocK7haruIcon22=s96-c",
  },
  {
    uid: 7,
    name: "momo",
    userIcon: "https://lh3.googleusercontent.com/a/ACg8ocK7momoAvatar=s96-c",
  },
  {
    uid: 8,
    name: "sou",
    userIcon: "https://lh3.googleusercontent.com/a/ACg8ocK7souIconPic=s96-c",
  },
  {
    uid: 9,
    name: "aoi",
    userIcon: "https://lh3.googleusercontent.com/a/ACg8ocK7aoiProfile=s96-c",
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
