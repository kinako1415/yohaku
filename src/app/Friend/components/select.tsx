"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import style from "./select.module.scss";
import { FriendCard } from "./friendCard";
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

export const Select = () => (
  <Tabs className={style.tabs}>
    <TabList className={style.tabList}>
      <Tab className={style.tab} selectedClassName={style.tabSelected}>
        申請中
      </Tab>
      <Tab className={style.tab} selectedClassName={style.tabSelected}>
        保留中
      </Tab>
    </TabList>

    <TabPanel>
      <div className={style.wrapper}>
        <div className={style.content}>
          {friendList.map((friend) => (
            <FriendCard
              key={friend.uid}
              name={friend.name}
              userIcon={friend.userIcon}
              isApply={true}
            />
          ))}
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
);
