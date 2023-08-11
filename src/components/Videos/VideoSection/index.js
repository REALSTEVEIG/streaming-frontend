import React from "react";
import styles from "./video.module.css";
import { GiBackwardTime } from "react-icons/gi";
import { BsFillShareFill } from "react-icons/bs";
import Link from "next/link";

const VideoSection = ({ video }) => {
  return (
    <section className={`row my-4 my-sm-4 my-md-4 my-lg-5 my-xl-5 m-auto`}>
      <div
        className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex flex-column justify-content-start align-items-start px-3 px-sm-3 px-md-5 px-lg-5 px-xl-5 ${styles.video_container}`}
      >
        <h6 className={`h6 mx-3 mx-sm-3 mx-md-5 mx-lg-5 mx-xl-5 mx-3 px-sm-3 px-md-5 px-lg-5 px-xl-5 fw-bold mb-4`}>{video?.post[0]?.title}</h6>
      </div>
      <div
        className={`px-3 px-sm-3 px-md-3 px-lg-3 px-xl-3 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex flex-column justify-content-center align-items-center ${styles.video_container}`}
      >
        <div className={`d-flex flex-row justify-content-end align-items-end ${styles.top_controls}`}>
          <Link href="#" className={`text-center text-white ${styles.top_control}`}>
            <GiBackwardTime size={25} /> <br />
            <small className={`small`}>Watch Later</small>
          </Link>
          <a href="#" className={`text-center text-white ${styles.top_control}`}>
            <BsFillShareFill size={20} /> <br />
            <small className={`small`}>Share</small>
          </a>
        </div>
        <video className={`${styles.video} m-auto`} poster={`${video?.primary_postal_url ?? "/assets/videos/images/videos-postal.png"}`} controls>
          <source src="/assets/videos/video.mp4" type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default VideoSection;
