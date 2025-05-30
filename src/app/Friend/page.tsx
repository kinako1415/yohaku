import { FriendCard } from "./components/friendCard";
import { Select } from "./components/select";
import style from "./index.module.scss";
import icon from "@/assets/userIcon.svg";

const friendList: Friend[] = [
  { uid: 1, name: "田中", userIcon: icon },
  { uid: 2, name: "佐藤", userIcon: icon },
  { uid: 3, name: "鈴木", userIcon: icon },
  { uid: 4, name: "山本", userIcon: icon },
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
            />
          ))}
        </div>
      </div>
    </>
  );
}
