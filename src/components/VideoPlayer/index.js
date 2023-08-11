import React, { useRef, useState } from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { BiFullscreen } from "react-icons/bi";
import { RxSpeakerLoud } from "react-icons/rx";

import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import styles from "./style.module.css";

const VideoPlayer = ({ videoSource, autoPlay, ...props }) => {
  const videoRef = useRef();
  const [isPlay, setIsPlay] = useState(autoPlay ?? false);
  const [current, setCurrent] = useState("");

  const play = () => {
    const video = videoRef.current;
    if (video.paused) video.play();
    else video.pause();
    setIsPlay((value) => !value);
  };

  const timeUpdate = () => {
    const video = videoRef.current;
    let curr = (video.currentTime / video.duration) * 100;
    if (video.ended) {
      setIsPlay((value) => !value);
    }
    setCurrent(`${curr}%`);
  };

  const rewind = () => {
    const video = videoRef.current;
    video.currentTime = video.currentTime - (video.duration / 100) * 5;
  };

  const forward = () => {
    const video = videoRef.current;
    video.currentTime = video.currentTime + (video.duration / 100) * 5;
  };

  const fullScreen = () => {
    videoRef.current.requestFullscreen();
  };

  const volume = () => {
    console.log("volume :>>>>>>>>>>>", videoRef);
  };

  return (
    <div className={`${styles.container}`}>
      <video
        onTimeUpdate={() => {
          timeUpdate();
        }}
        ref={videoRef}
        onClick={() => {
          play();
        }}
        id={"video"}
        src={videoSource}
        {...props}
      />
      <div className={`d-flex flex-row justify-content-center align-items-center ${styles.controls}`}>
        <button
          type="button"
          onClick={() => {
            rewind();
          }}
        >
          <MdSkipPrevious size={25} />
        </button>
        <button
          type="button"
          onClick={() => {
            play();
          }}
        >
          {isPlay ? <BsFillPauseCircleFill size={35} /> : <BsFillPlayCircleFill size={35} />}
        </button>
        <button
          onClick={() => {
            forward();
          }}
        >
          <MdSkipNext size={25} />
        </button>
        <div className={`${styles.timeline}`}>
          <div className={`${styles.bar}`}>
            <div className={`${styles.inner}`} style={{ width: `${current}` }}></div>
          </div>
        </div>
        <button
          onClick={() => {
            volume();
          }}
        >
          <RxSpeakerLoud />
        </button>

        <button
          onClick={() => {
            fullScreen();
          }}
        >
          <BiFullscreen />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
