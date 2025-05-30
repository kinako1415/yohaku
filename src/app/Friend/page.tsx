import { FriendCard } from "./components/friendCard";
import { Select } from "./components/select";
import style from "./index.module.scss";
import icon from "@/assets/userIcon.svg";
import Image from "next/image";
import qr from "@/assets/QRcode Icon.svg";

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
      <div className={style.qrCode}>
        <Image src={qr} alt="QRコードの画像" width={70} height={70} />
        <p className={style.qrText}>QRコード作成 / ID検索</p>
      </div>
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
            />
          ))}
        </div>
      </div>
    </>
  );
}
