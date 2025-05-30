import style from "./index.module.scss";

import { SearchBar } from "./components/SearchBar";
import { MyId } from "./components/myId";

export default function Page() {
  return (
    <>
      <SearchBar />
      <MyId />
    </>
  );
}
