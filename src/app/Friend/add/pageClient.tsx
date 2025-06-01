"use client";

import { useState } from "react";
import style from "./index.module.scss";
import Image from "next/image";
import icon from "@/assets/userIcon.svg";
import { Button } from "@/components/elements/Button";
import FallingBalls from "./falling";
import { motion } from "framer-motion";

export const PageClient = () => {
  const [showBalls, setShowBalls] = useState(false);
  const MotionImage = motion(Image);
  const handleAddClick = () => {
    setShowBalls(true);
    // 3秒後にアニメーションを非表示に（任意）
    setTimeout(() => {
      setShowBalls(false);
    }, 3000);
  };

  return (
    <>
      <div className={style.content}>
        {showBalls && <FallingBalls />}

        <div className={style.user}>
          <MotionImage
            src={icon}
            alt="userのiconです"
            width={150}
            height={150}
            initial={{ y: 0 }}
            animate={showBalls ? { y: [0, -30, 0] } : { y: 0 }} // 上→下→元に戻る
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <p className={style.userName}>sasaki_0</p>
        </div>

        <div className={style.container}>
          <div className={style.button}>
            <Button type="button" size="lg" onClick={handleAddClick}>
              追加
            </Button>
          </div>

          {/* 背景のデコレーション */}
          <div style={showBalls ? { display: "none" } : {}}>
            <div
              className={`${style.circle} ${style.large} ${style.filled} ${style.topRight}`}
            ></div>
            <div
              className={`${style.circle} ${style.small} ${style.outlined} ${style.topLeft}`}
            ></div>
            <div
              className={`${style.circle} ${style.medium} ${style.filled} ${style.bottomLeft}`}
            ></div>
            <div
              className={`${style.circle} ${style.small} ${style.outlined} ${style.bottomCenter}`}
            ></div>
            <div
              className={`${style.circle} ${style.large} ${style.outlined} ${style.bottomRight}`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
