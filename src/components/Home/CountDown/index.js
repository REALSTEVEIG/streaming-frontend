import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
const CountDown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState("00");

  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const secondsInMs = 1000;
    const minutesInMs = secondsInMs * 60;
    const hoursInMs = minutesInMs * 60;
    const daysInMs = hoursInMs * 24;
    const weeksInMs = daysInMs * 7;

    const weeks = Math.floor(difference / weeksInMs);
    const days = Math.floor((difference % weeksInMs) / daysInMs);
    const hours = Math.floor((difference % daysInMs) / hoursInMs);
    const minutes = Math.floor((difference % hoursInMs) / minutesInMs);
    const seconds = Math.floor((difference % minutesInMs) / secondsInMs);

    return { weeks, days, hours, minutes, seconds };
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [calculateTimeLeft]);

  const formatTimeUnit = (unit) => (unit < 10 ? `0${unit}` : unit);

  return (
    <div className={`row ${styles.counter}`}>
      <div className="col-12 col-sm-12 col-md-4 col-lg-6 col-xl-6">
        <h6 className="h6 ktn-text-primary mb-0">Live Streaming</h6>
        <small className="small text-white">Starts in:</small>
      </div>
      <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 d-flex flex-row justify-content-between">
        <div className={`text-center`}>
          <h5 className="h5 text-white fw-bold">{formatTimeUnit(timeLeft.days)}</h5>
          <h5 className={`h5 text-white fw-bold ${styles.time}`}>Days</h5>
        </div>
        <div className={`text-center`}>
          <h5 className="h5 text-white fw-bold">{formatTimeUnit(timeLeft.hours)}</h5>
          <h5 className={`h5 text-white fw-bold ${styles.time}`}>Hours</h5>
        </div>
        <div className={`text-center`}>
          <h5 className="h5 text-white fw-bold">{formatTimeUnit(timeLeft.minutes)}</h5>
          <h5 className={`h5 text-white fw-bold ${styles.time}`}>Minutes</h5>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
