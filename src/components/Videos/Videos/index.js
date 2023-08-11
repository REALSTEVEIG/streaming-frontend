import React from "react";
import styles from "./video.module.css";
import { AiFillPlayCircle } from "react-icons/ai";

const VideoItem = ({ item }) => {
  return (
    <div className={`col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3`}>
      <div className={`card border-0 ${styles.card}`}>
        <a href="#" className={`${styles.play_link}`}>
          <AiFillPlayCircle className={`${styles.play}`} />
        </a>
        <div className={`card-body m-auto`}>
          <video poster={`${item?.tertiary_postal_url}`} className={`${styles.video}`}>
            <source src={`${item?.video_url}`} type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
