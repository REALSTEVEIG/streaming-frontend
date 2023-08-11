//#region Imports
import AppHead from "@/components/Layout/Head";
import RecentLiveItem from "@/components/LiveEvents/RecentLiveItem";
import { getActiveStreamingEvent, getLiveEvents, getPostDetails } from "@/services/posts.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
//#endregion

const LiveEvent = () => {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [recentVideos, setRecentVideos] = useState([]);

  const getRecentVideos = async () => {
    let result = await getLiveEvents({});
    setRecentVideos(result?.data ?? []);
  };

  const getLiveEvent = async () => {
    console.log("Slog :>>>>>>>>>>>>>>>>>", router?.query?.slog);
    let id = router?.query?.slog ? router?.query?.slog[0] : null;
    if (id && id != "active") {
      let result = await getPostDetails(id);
      setVideo(result.data);
    } else {
      let result = await getActiveStreamingEvent();
      if (result.success) {
        setVideo(result?.data);
      }
    }
  };

  useEffect(() => {
    getLiveEvent();
  }, []);

  useEffect(() => {
    getRecentVideos();
  }, []);

  return (
    <>
      <AppHead title={`Playing - ${video?.title}`} />
      <div className="container-fluid">
        <div className="row bg-dark">
          <div className={`col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 py-0 ${styles.container}`}>
            <Link href={`/`} className={`nav-link`}>
              <Image priority width={50} height={50} alt="Logo" className={`position-absolute ${styles.logo}`} src={`/assets/images/ktn-logo.png`} />
            </Link>
            <video
              controls
              postal={
                video?.stream?.primary_postal_url?.includes("http")
                  ? video?.stream?.primary_postal_url
                  : `${video?.stream?.primary_postal_url ? "http://" : ""}${video?.stream?.primary_postal_url ?? "/assets/icons/logo-knt-blue.png"}`
              }
              className={`${styles.video}`}
            >
              {/* <source src={`https://atechgroupuk.site/DTV/DTV.m3u8`} type="video/m3u8" /> */}
              <source src={`${video?.stream?.live_streaming_url ? "http://" + video?.video?.stream?.live_streaming_url : "/assets/videos/video.mp4"}`} type="video/mp4" />
              <source src="https://youtu.be/tWxHXhgiP7U" type="video/ogg" />
              Your browser does not support HTML video.
            </video>
          </div>
          <div className={`col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 ps-0 ${styles.container}`}>
            <div className={`card border-0 ${styles.videoDescription}`}>
              <div className="card-header">
                <h6 className="h6 fw-bold">{video?.title ?? "No title"}</h6>
              </div>
              <div className="card-body">
                <p className="p">{video?.description}</p>
              </div>
            </div>
          </div>
          <div className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 m-auto`}>
            <div className="row my-5 justify-content-center">
              <div className="col-10">
                <h6 className={`small ktn-text-primary fw-bold text-center mb-0`}>Related Videos</h6>
                <div className={`my-2 ${styles.hr}`} />
              </div>
            </div>
            <div className="row px-3 px-sm-3 px-md-3 px-lg-0 px-xl-0 justify-content-start">
              <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 m-auto">
                <div className="row">
                  {recentVideos?.map((item) => {
                    return <RecentLiveItem key={item._id} item={item} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveEvent;
