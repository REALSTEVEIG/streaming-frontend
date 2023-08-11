import React from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import styles from "./top.module.css";

const TopSection = () => {
  return (
    <section className={`row ${styles.section}`}>
      <div className={`col-12`}>
        <div className={`row ${styles.overlay}`}>
          <div className={`d-flex flex-column justify-content-center align-items-center`}>
            <div className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-2 p-sm-2 p-md-3 p-lg-5 p-xl-5 d-flex flex-row justify-content-center align-items-center`}>
              <hr className="text-white my-2 border border-1" />
              <h3 className={`h3 text-white`}>KTN Policies</h3>
              <hr className="text-white my-2 border border-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
