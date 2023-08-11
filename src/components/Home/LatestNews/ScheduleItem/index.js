import React from "react";
import { RxCountdownTimer } from "react-icons/rx";
import styles from "./styles.module.css";

const ScheduleItem = ({ schedule }) => {
  return (
    <div className="row">
      {schedule?.map((item, index) => {
        return (
          <div key={item._id} className={`col-6`}>
            <h6 className={`h6 fw-bold ${styles.schedule}`}>
              {item.language} - {item.location}
            </h6>
            <small className={`small ${styles.time}`}>
              <RxCountdownTimer size={20} color="#B78400" /> {item.start_time} &nbsp; {item.end_time}
            </small>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleItem;
