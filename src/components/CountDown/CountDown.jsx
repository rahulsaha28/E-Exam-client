import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../../Store/ExamStore.js";
import { useCountDown } from "../../Store/Store.js";

const CountDown = () => {
  const { hours, min, sec, startTimer, updateTimer, totalTime } = useCountDown(
    (state) => state
  );
  const { exam } = useExamStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    startTimer({
      hours: exam?.totalTime?.hour,
      min: exam?.totalTime?.min,
      sec: 0,
    });
    let intervalID;
    let count = totalTime;

    intervalID = setInterval(() => {
      updateTimer();
      count--;
      if (count < 1) {
        clearInterval(intervalID);
        navigate("/pdf");
      }
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [startTimer]);

  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-2">
        <div className="counter">{String(hours).padStart(2, "0")}</div>
        <div className="counter">{String(min).padStart(2, "0")}</div>
        <div className="counter">{String(sec).padStart(2, "0")}</div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="counter-str">Hour</div>
        <div className="counter-str">Min</div>
        <div className="counter-str">Sec</div>
      </div>
    </div>
  );
};

export default CountDown;
