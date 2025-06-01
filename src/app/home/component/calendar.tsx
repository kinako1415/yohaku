"use client";

import style from "./Calendar.module.scss";
import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import { calcWeek } from "./utils";
import { hour } from './utils';

import iconMonth from "../../../assets/Vectordown.svg";
import iconWeek from "../../../assets/Vectorup.svg";
import Image from "next/image";
import { posix } from "path";

const days = ["日", "月", "火", "水", "木", "金", "土"];

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: 4,
}));

const FirstGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "50px calc(100% - 50pc)",
}));

const DaysGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr) ",
}));

const RowsGrid = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  display: "grid",
  gridTemplateRows: `repeat('24, ${theme.spacing(6)})`,
}));

const Day = styled(Box)(() => ({
  borderLeft: "1px solid #dcdcdc",
}));

const Hour = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(3),
  textAlign: "right",
  position: "relative",
  "&::before": {
    position: "absolute",
		top: 11,
		left: 55,
		content: '""',
		width: 'calc(100vw - 70px)',
		borderTop: '1px solid #dcdcdc',
  },
}));



export default function Calendar() {
  const [week, setWeek] = useState(calcWeek());
  return (
    <>
      <Wrapper>
        <FirstGrid>
          <RowsGrid>
            {hour(24).map((time, idx) => (
              <Hour key={idx}>{time}:00</Hour>
            ))}
          </RowsGrid>
          <DaysGrid>
            {week.map((day, idx) => (
							<>
              <Day key={idx}>
                {day.format("D")}
                <br />
                {day.format("ddd")}
              </Day>
							</>
					
            ))}
          </DaysGrid>
        </FirstGrid>
      </Wrapper>
    </>
  );
}
