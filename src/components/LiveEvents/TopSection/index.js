import React, { useEffect, useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import styles from "./top.module.css";
import { getSectionBanner } from "@/services/settings.service";
import { PAGES } from "@/constants/constants";

const TopSection = () => {
  const [banner, setBanner] = useState("");
  const getBanner = async () => {
    let result = await getSectionBanner(PAGES.LIVE_BANNER);
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
        background: `url("${banner ? banner : "/assets/images/home-bg.png"}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`row ${styles.section}`}
    >
      <div className={`row p-5 p-sm-5 p-md-5 p-lg-5 p-xl-5 ${styles.overlay} justify-content-center`}>
        <div
          className={` mt-5 mt-sm-5 mt-md-1 mt-lg-1 mt-xl-1 col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-2 p-sm-2 p-md-3 p-lg-5 p-xl-5 d-flex flex-column justify-content-center`}
        >
          <h4 className={`h3 text-white`}>
            Live Event &nbsp;
            <span className={`ktn-text-primary ${styles.span_text}`}>From Kingdom Tv</span>
          </h4>
          <hr className="text-white my-2 border border-1" />
          <p className={`small text-white ${styles.p_text}`}>
            All live events, including Church Services on Wednesday, Saturdays, and Sundays will be streaming on this page, broadcasted on Satellite Television, and
            pushed on Kingdom Tv App
          </p>
        </div>
        <div className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex flex-column justify-content-end align-items-end`}>
          <div
            style={{
              backgroundImage: `url("${banner ? banner : "/assets/images/player-image.png"}")`,
            }}
            className={`col-12 col-sm-12 col-md-6 col-lg-7 d-flex flex-column justify-content-center p-3 col-xl-7 ${styles.top_player}`}
          >
            <h6 className="small text-white">
              <BsFillPlayCircleFill size={25} className={`${styles.play_button}`} />
              Streaming live
            </h6>
            <h6 className={`small text-white text-end align-text-bottom ${styles.base_title}`}>By Onorio Cutane</h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
