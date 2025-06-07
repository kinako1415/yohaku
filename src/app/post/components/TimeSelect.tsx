import { useEffect, useRef, useState } from "react";
import Picker from "react-mobile-picker";
import style from "./TimeSelect.module.scss";


type TimeSelectProps = {
  startedAt: string;
  endedAt: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
};

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const minutes = Array.from({ length: 12 }, (_, i) =>
  String(i * 5).padStart(2, "0")
);

export const TimeSelect: React.FC<TimeSelectProps> = ({
  startedAt, endedAt, onStartChange, onEndChange,}: TimeSelectProps) => {
  // const [startTime, setstartTime] = useState({ hour: "14", minute: "00" });
  // const [endTime, setendTime] = useState({ hour: "14", minute: "00" });
  const [selectPicker, setselectPicker] = useState<"start" | "end" | null>(
    null
  );

  function getTimeObject(time: string | undefined) {
    try {
      const [hour, minute] = time?.split(":") || ["", ""];
      return { hour, minute };
    } catch {
      return { hour: "11", minute: "00" };
    }
  }

  const pickerRef = useRef<HTMLDivElement>(null);
  const pickerValue = selectPicker === "start" ? getTimeObject(startedAt) : getTimeObject(endedAt);

  //const { setValue } = useFormContext();

  const handleChange = (value: { hour: string; minute: string }) => {
    const formatted = `${value.hour}:${value.minute}`;
    if (selectPicker === "start") {
      onStartChange(formatted);
    } else if (selectPicker === "end") {
      onEndChange(formatted);
    }
  };

  const formatTime = (timeStr: string) => timeStr;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setselectPicker(null); // 外側をクリックしたらPicker閉じる
      }
    };

    if (selectPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    //クリーンアップ
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectPicker]);

  return (
    <div className={style.container}>
      <div
        className={`${style.timeRow} ${
          selectPicker === "start" ? style.timeRowSelected : ""
        }`}
        onClick={() => setselectPicker("start")}
      >
        <span className={style.label}>開始</span>
        <span className={style.value}>{formatTime(startedAt)}</span>
      </div>
      <hr className={style.hr} />
      <div
        className={`${style.timeRow} ${
          selectPicker === "end" ? style.timeRowSelected : ""
        }`}
        onClick={() => setselectPicker("end")}
      >
        <span className={style.label}>終了</span>
        <span className={style.value}>{formatTime(endedAt)}</span>
      </div>

      {selectPicker && (
        <div ref={pickerRef} className={style.pickerWrapper}>
          <Picker value={pickerValue} onChange={handleChange}>
            <Picker.Column name="hour">
              {hours.map((hour) => (
                <Picker.Item key={hour} value={hour}>
                  {hour}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="minute">
              {minutes.map((minute) => (
                <Picker.Item key={minute} value={minute}>
                  {minute}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      )}
    </div>
  );
};
