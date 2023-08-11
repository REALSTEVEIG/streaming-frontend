import React from "react";
import styles from "./global.module.css";
import { BiCameraMovie } from "react-icons/bi";
import { RiRecordMailFill } from "react-icons/ri";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaGlobeAmericas } from "react-icons/fa";

const GlobalNetwork = () => {
  return (
    <div className={`row ${styles.container}`}>
      <div className={`col-12 ${styles.inner_container}`}>
        <div className={`row ps-3 px-sm-1 px-md-3 px-lg-5 px-xl-5 h-100 ${styles.row}`}>
          <div className={`col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 ps-1 ps-sm-1 ps-md-3 ps-lg-5 ps-xl-5 d-flex flex-column justify-content-center`}>
            <div className="row mb-4">
              <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2 pe-0">
                <div className={`${styles.outer} d-flex flex-column justify-content-center align-items-center`}>
                  <div className={`${styles.inner} d-flex flex-column justify-content-center align-items-center`}>
                    <BiCameraMovie className="small" size={25} color={"#ffffff"} />
                  </div>
                </div>
              </div>
              <div className="col-8 col-sm-8 col-md-8 col-lg-5 col-xl-5 ps-3">
                <h6 className="h6 text-white mb-0">Production</h6>
                <small className="small text-white">6 studios worldwide</small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2 pe-0">
                <div className={`${styles.outer} d-flex flex-column justify-content-center align-items-center`}>
                  <div className={`${styles.inner} d-flex flex-column justify-content-center align-items-center`}>
                    <RiRecordMailFill size={25} color={"#ffffff"} />
                  </div>
                </div>
              </div>
              <div className="col-8 col-sm-8 col-md-8 col-lg-5 col-xl-5 ps-3">
                <h6 className="h6 text-white mb-0">Programming</h6>
                <small className="small text-white">100% Christian content</small>
              </div>
            </div>
          </div>
          <div className={`col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 d-flex flex-column justify-content-center align-items-center ${styles.middle}`}>
            <h6 className={`h6 text-uppercase text-white text-bolder ${styles.text_black}`}>kingdom television</h6>
            <h6 className={`h6 text-uppercase text-white text-bolder ${styles.text_black} ${styles.global_network}`}>global network</h6>
          </div>
          <div className={`col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 ps-1 ps-sm-1 ps-md-3 ps-lg-5 ps-xl-5 d-flex flex-column justify-content-center`}>
            <div className="row mb-4">
              <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2 pe-0">
                <div className={`${styles.outer} d-flex flex-column justify-content-center align-items-center`}>
                  <div className={`${styles.inner} d-flex flex-column justify-content-center align-items-center`}>
                    <HiOutlineSpeakerWave className="small" size={25} color={"#ffffff"} />
                  </div>
                </div>
              </div>
              <div className="col-8 col-sm-8 col-md-8 col-lg-5 col-xl-5 ps-3">
                <h6 className="h6 text-white mb-0">Languages</h6>
                <small className={`small text-white ${styles.line_height}`}>French, English, Portuguese and Spanish</small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2 pe-0">
                <div className={`${styles.outer} d-flex flex-column justify-content-center align-items-center`}>
                  <div className={`${styles.inner} d-flex flex-column justify-content-center align-items-center`}>
                    <FaGlobeAmericas size={25} color={"#ffffff"} />
                  </div>
                </div>
              </div>
              <div className="col-8 col-sm-8 col-md-8 col-lg-5 col-xl-5 ps-3">
                <h6 className="h6 text-white mb-0">Coverage</h6>
                <small className="small text-white">48 Countries</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNetwork;
