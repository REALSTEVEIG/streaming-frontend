import VideoPlayer from "@/components/VideoPlayer";
import { getActiveStreamingEvent, getLiveEvents } from "@/services/posts.service";
import React, { useEffect, useState } from "react";
import styles from "./live.module.css";

const LiveEventSection = () => {
  const [video, setVideo] = useState([]);

  const getLiveEvent = async () => {
    // const result = await getActiveStreamingEvent();
    const result = await getLiveEvents({ page:0 });
     const liveVideos = result?.allYoutubeStreams?.filter((item) => item.video_type === "Live");
      setVideo(liveVideos.slice(0, 1));
  };

  useEffect(() => {
    getLiveEvent();
  }, []);

 

  return (
    <>
      <div className={`row justify-content-center py-4 py-sm-4 py-md-4 py-lg-4 py-xl-4`}>
        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 px-4 px-sm-4 px-md-4 px-lg-4 px-xl-4">
          <h5 className={`h5 fw-bold ${styles.title} mx-2`}>
            Live Event &nbsp;
            <span className={`ktn-text-primary ${styles.span_text}`}>Watching now</span>
          </h5>
        </div>
      </div>
      <div className={`row justify-content-center ${styles.section}`}>
        <div className={`col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 px-4 px-sm-4 px-md-4 px-lg-4 px-xl-4`}>
          <div className="flex justify-between gap-5">
          {video.map((data, index) => (
            <div key={index}>
              <iframe allowFullScreen className={` rounded`} height={250} src={data?.youtube_url} width={500} />
            </div>
          ))}
        </div>
          {/* <VideoPlayer className={`${styles.video}`} poster="/assets/videos/images/postal.png" videoSource={"/assets/videos/video.mp4"} /> */}
          {/* <video controls poster={`${video?.primary_postal_url ?? "/assets/videos/images/postal.png"}`} className={`${styles.video}`}>
            <source src="/assets/videos/video.mp4" type="video/mp4" />
            <source src="https://youtu.be/tWxHXhgiP7U" type="video/ogg" />
            Your browser does not support HTML video.
          </video> */}
        </div>
        <div className={`col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 px-4 px-sm-4 px-md-4 px-lg-4 px-xl-4`}>
          <span className={`ktn-text-primary ${styles.span_text}`}>Watching now</span>
          {/* <h6 className={`h6 fw-bold text-uppercase`}>{video?.post?.title}</h6> */}
          <hr className={`my-2 text-dark ${styles.divider}`} />
          <p className={`small ${styles.p_text}`}>{video[0]?.title}</p>
        </div>
      </div>
    </>
  );
};

export default LiveEventSection;
