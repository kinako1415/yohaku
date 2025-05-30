"use client";

import { useState } from "react";
import style from "./SearchBar.module.scss";
import { Icon } from "@iconify/react";

export const SearchBar = () => {
  const [searchName, setSearchName] = useState<string>("");

  return (
    <>
      <div className={style.contents}>
        <div className={style.searchContainer}>
          <input
            type="text"
            placeholder="ID検索"
            value={searchName}
            className={style.searchBar}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
          <Icon icon="bi:search" className={style.searchIcon} />
        </div>
      </div>
    </>
  );
};
