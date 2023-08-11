import React, { useEffect, useState } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import styles from "./top.module.css";
import { getSectionBanner } from "@/services/settings.service";
import { PAGES } from "@/constants/constants";

const TopSection = () => {
  const [banner, setBanner] = useState("");
  const getBanner = async () => {
    let result = await getSectionBanner(PAGES.VIDEOS_BANNER);
    if (result.success) {
      setBanner(result.data?.image_url);
    }
  };
  useEffect(() => {
    getBanner();
  }, []);
  return (
    <section
      style={{
        background: `url("${banner ? banner : "/assets/videos/videos-image.png"}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`row ${styles.section}`}
    >
      <div className={`col-12`}>
        <div className={`row ${styles.overlay}`}>
          <div className={`d-flex flex-column justify-content-center align-items-center`}>
            <div className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-2 p-sm-2 p-md-3 p-lg-5 p-xl-5 d-flex flex-column justify-content-center align-items-center`}>
              <h4 className={`h4 text-white text-uppercase`}>
                <BsFillCameraVideoFill className={`${styles.video_icon} me-2`} />
                videos
              </h4>
              <hr className="text-white my-2 border border-1" />
              <p className={`small text-white text-center text-uppercase ${styles.p_text}`}>
                this page provides a digital library of all the videos publicy availble on Kingdom telivision
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`col-12 ${styles.bottom_title}`}>
        <h6 className={`h6 ${styles.title} text-white`}>
          By Onorio Cutane <br />
          <small className="small">Kingdom Television</small>
        </h6>
      </div>
    </section>
  );
};

export default TopSection;
