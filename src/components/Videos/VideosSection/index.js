import React from "react";
import styles from "./videos.module.css";
import VideoItem from "../Videos";

const VideosSection = ({ videos, children }) => {
    return (
    <section className={`row my-2 my-sm-4 my-md-4 my-lg-5 my-xl-5`}>
      <div className={`col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 px-4 px-sm-4 px-md-5 px-lg-5 px-xl-5 m-auto ${styles.video_container}`}>
        <h6 className={`h6 fw-bold mb-4`}>Recent Videos</h6>
        {children}
      </div>
      <div className={`col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 mx-auto my-4 ${styles.video_container}`}>
        <div className={`row mx-auto justify-content-start`}>
          {videos?.map((item, index) => {
            return <VideoItem key={item._id} item={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
