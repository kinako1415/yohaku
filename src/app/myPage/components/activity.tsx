import style from "./activity.module.scss";

export const Activity = () => {
  return (
    <>
      <div className={style.content}>
        <div className={style.times}>
          <p className={style.day}>12/15</p>
          <p className={style.time}>17:00-19:00</p>
        </div>
        <div className={style.text}>
          <h4 className={style.title}>代々木公園でお散歩</h4>
          <p className={style.detail}>天気がいいのでお散歩しませんか？</p>
          <p className={style.match}>2人とマッチ</p>
        </div>
      </div>
    </>
  );
};
