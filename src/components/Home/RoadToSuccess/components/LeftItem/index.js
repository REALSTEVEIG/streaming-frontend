import React from "react";
import styles from "./left.module.css";

const LeftItem = ({ item }) => {
  return (
    <div className={`row justify-content-start`}>
      <div className={`col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ${styles.left}`}>
        <div className={`card border-0`}>
          <div className={`card-header pe-0 pe-sm-0 pe-md-0 pe-lg-0 pe-xl-0 bg-transparent position-relative`}>
            <div className={`${styles.date} px-3`}>{item.year}</div>
            <h5 className={`h5 fw-bold text-start ${styles.title}`}>{item.title}</h5>
          </div>
          <div className={`card-body pe-0 pe-sm-0 pe-md-2 pe-lg-0 pe-xl-0 d-flex flex-row justify-content-start`}>
            <p className={`${styles.small}  w-75 text-start`}>{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftItem;
