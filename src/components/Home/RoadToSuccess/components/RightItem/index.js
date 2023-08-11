import React from "react";
import styles from "./right.module.css";
const RightItem = ({ item }) => {
  return (
    <div className={`row justify-content-end`}>
      <div className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${styles.right}`}>
        <div className={`card border-0`}>
          <div className={`card-header ps-0 ps-sm-0 ps-md-0 ps-lg-0 ps-xl-0 bg-transparent ${styles.header}`}>
            <div className={`${styles.date} px-3`}>{item.year}</div>
            <h5 className={`h5 fw-bold text-start ${styles.title}`}>{item.title}</h5>
          </div>
          <div className={`card-body ps-0 ps-sm-0 ps-md-0 ps-lg-0 ps-xl-0 ${styles.ktn_body}`}>
            <p className={`${styles.small} w-75`}>{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightItem;
