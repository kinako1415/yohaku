"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Ball = ({ x, outlineOnly }: { x: number; outlineOnly: boolean }) => {
  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 750 }}
      transition={{
        duration: Math.random() * 2 + 2, // 2〜4秒で落下
        ease: "easeIn", // 徐々に加速
        repeatDelay: Math.random() * 2, //遅延を毎回入れる
      }}
      style={{
        position: "absolute",
        top: 0,
        left: x,
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: outlineOnly ? "transparent" : "#3fe57b",
        border: outlineOnly ? "2px solid #3fe57b" : "none",
        zIndex: 10,
      }}
    />
  );
};

const FallingBalls = () => {
  const [balls, setBalls] = useState<{ x: number; outlineOnly: boolean }[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const ballData = Array.from({ length: 20 }, () => ({
        x: Math.floor(Math.random() * width),
        outlineOnly: Math.random() < 0.5, // 50%の確率でアウトライン
      }));
      setBalls(ballData);
    }
  }, []);

  return (
    <>
      {balls.map((ball, idx) => (
        <Ball key={idx} x={ball.x} outlineOnly={ball.outlineOnly} />
      ))}
    </>
  );
};

export default FallingBalls;
