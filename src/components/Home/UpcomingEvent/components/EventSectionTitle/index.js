import React from "react";
import styles from "./event.module.css";
const EventSectionTitle = () => {
  return (
    <div className="col-10 col-sm-10 col-md-10 col-lg-5 col-xl-5 d-flex flex-row justify-content-center align-items-center mx-auto my-5">
      <hr className={`hr ${styles.hr}`} />
      <div className={`d-flex flex-column justify-content-end ${styles.middle} text-end me-2 me-sm-2 me-md-3 me-lg-3 me-xl-3`}>
        <h4 className="h4 text-uppercase fw-bold mb-1">upcoming</h4>
        <h6 className="h6 text-uppercase ktn-text-primary">events</h6>
      </div>
      <hr className={`hr ${styles.hr}`} />
    </div>
  );
};

export default EventSectionTitle;
