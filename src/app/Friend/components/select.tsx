"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import style from "./select.module.scss";
import { FriendCard } from "./friendCard";
import icon from "@/assets/userIcon.svg";
import Image from "next/image";
import qr from "@/assets/QRcode Icon.svg";
import { useRouter } from "next/navigation";

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

export const Select = () => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => {
          router.push("./friend/111111");
        }}
        className={style.qrCode}
      >
        <Image src={qr} alt="QRコードの画像" width={70} height={70} />
        <p className={style.qrText}>QRコード作成 / ID検索</p>
      </div>
      <Tabs className={style.tabs}>
        <TabList className={style.tabList}>
          <Tab className={style.tab} selectedClassName={style.tabSelected}>
            申請中
          </Tab>
          <Tab className={style.tab} selectedClassName={style.tabSelected}>
            保留中
          </Tab>
        </TabList>

        {/* 申請中の時 */}
        <TabPanel>
          <div className={style.wrapper}>
            <div className={style.content}>
              {friendList.map((friend) => (
                <FriendCard
                  key={friend.uid}
                  name={friend.name}
                  userIcon={friend.userIcon}
                  isApply={true}
                  isAllow={false}
                />
              ))}
            </div>
          </div>
        </TabPanel>
        {/* 保留中の時 */}
        <TabPanel>
          <div className={style.wrapper}>
            <div className={style.content}>
              {friendList.map((friend) => (
                <FriendCard
                  key={friend.uid}
                  name={friend.name}
                  userIcon={friend.userIcon}
                  isApply={false}
                  isAllow={true}
                />
              ))}
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};
