"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import style from "./select.module.scss";
import { FriendCard } from "./friendCard";
import icon from "@/assets/userIcon.svg";
import Image from "next/image";
import qr from "@/assets/QRcode Icon.svg";
import { useRouter } from "next/navigation";

const friendList: Friend[] = [
  {
    uid: 1,
    name: "tomtoma",
    userIcon:
      "https://obs.line-scdn.net/0hO3YQohulEBxkKAX2uOBvSzp7FmcWTxJUCxYUJRZtUH4SGR8hLT0eETdIB1BLYwkhBy0cAR5URnwWaFQxBy5XKSNDTk0sbFI1Lk4WEQp6BVA8ZxQhEz4DKiQpCA",
  },
  {
    uid: 2,
    name: "しゃち",
    userIcon:
      "https://iconbu.com/wp-content/uploads/2022/03/%E3%81%AE%E3%82%93%E3%81%B3%E3%82%8A%E3%82%B5%E3%83%A1%E3%81%95%E3%82%93.jpg",
  },
];

const friendCheckList: Friend[] = [
  {
    uid: 1,
    name: "nasubi",
    userIcon:
      "https://iconbu.com/wp-content/uploads/2021/06/%E3%83%8A%E3%82%B9%E3%81%95%E3%82%93%E3%81%AE%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88.jpg",
  },
];

type Friend = {
  uid: number;
  name: string;
  userIcon: string;
};

export const Select = () => {
  const router = useRouter();
  return (
    <div className={style.container}>
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
              {friendCheckList.map((friend) => (
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
    </div>
  );
};
