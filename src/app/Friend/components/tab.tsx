"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import style from "./tab.module.scss";

export const Apply = () => (
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
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
);
