import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillVideoCamera } from "react-icons/ai";
import CountDown from "../CountDown";
import styles from "./top.module.css";
import { PAGES } from "@/constants/constants";
import { getSectionBanner } from "@/services/settings.service";
import { getActiveStreamingEvent } from "@/services/posts.service";

const TopSection = () => {
  const router = useRouter();
  const [banner, setBanner] = useState("");
  const [video, setVideo] = useState(null);

  const getBanner = async () => {
    let result = await getSectionBanner(PAGES.HOME_PAGE);
    if (result.success) {
      setBanner(result.data?.image_url);
    }
  };

  const getLiveEvent = async () => {
    const result = await getActiveStreamingEvent();
    setVideo(result.data);
  };

  useEffect(() => {
    getLiveEvent();
  }, []);

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <section
      style={{
        background: `url("${banner ? banner : "/assets/images/home-bg.png"}")`,
      }}
      className={`row ${styles.section}`}
    >
      <div className={`row ${styles.overlay} justify-content-center`}>
        <div className={`col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 p-4 p-sm-4 p-md-5 p-lg-5 p-xl-5 d-flex flex-column justify-content-between`}>
          <div className="row py-5">
            <div className="col-12 pt-5 pt-sm-3 pt-md-5 pt-lg-5 pt-xl-5">
              <h6 className="h6 text-uppercase ktn-text-primary">Satellite Television</h6>
              <h2 className={`h2 text-uppercase fw-bold text-white mb-5 ${styles.title}`}>
                Kingdom Television <br /> Network in hd
              </h2>
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  // router.push("live-events/active");
                  // router.push("coming-soon");
                  router.push("live-events");

                }}
                className={`btn btn-primary d-flex flex-row justify-content-center align-items-center ${styles.button}`}
              >
                <AiFillVideoCamera />
                <span className={`${styles.vl}`}></span>
                Live Streaming
              </button>
            </div>
          </div>
          {/* <CountDown targetDate={video?.scheduled_date ? new Date(video?.scheduled_date) : new Date()} /> */}
        </div>
        <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3 pt-5 d-flex flex-column justify-content-end align-items-end">
          <div className={`${styles.live_more_container} d-flex flex-column justify-content-center align-items-center`}>
            <ul className={`ul ${styles.nav}`}>
              <li className={`${styles.nav_item}`}>
                <Link href="live-events">Sermons</Link>
              </li>
              <li className={`${styles.nav_item}`}>
                <Link href="live-events">Worship</Link>
              </li>
              <li className={`${styles.nav_item}`}>
                <Link href="live-events">Music</Link>
              </li>
              <li className={`${styles.nav_item}`}>
                <Link href="press-release">Events</Link>
              </li>
            </ul>
            <div className={`small ktn-text-primary ${styles.live_more}`}>Live & More</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
