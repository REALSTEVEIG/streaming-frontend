import { getLiveEvents } from "@/services/posts.service";
import React, { useEffect, useState } from "react";
import RecentLiveItem from "../RecentLiveItem";
import styles from "./recent.module.css";
import Pagination from "@/components/Pagination";

const RecentLiveEventSection = () => {
  const [recentVideos, setRecentVideos] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const [limit, setLimit] = useState(8);
  const [totalSize, setTotalSize] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  const getRecentVideos = async () => {
    let result = await getLiveEvents({ page, size, limit });
    setTotalSize(result.allYoutubeStreams.count);
    if (Math.ceil(result.count/size) <= 1) setIsEnd(true);
    else setIsEnd(false);

    if (page > 0) setIsFirst(false);
    else setIsFirst(true);
    setRecentVideos(result?.allYoutubeStreams ?? []);
  };

  useEffect(() => {
    getRecentVideos();
  }, [page]);

  return (
    <>
      <div className="row justify-content-center py-2 py-sm-2 py-md-3 py-lg-3 py-xl-4">
        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 px-4 px-sm-4 px-md-4 px-lg-4 px-xl-4">
          <h5 className={`h5 fw-bold ${styles.title}`}>Recent Lives</h5>
          <Pagination isEnd={isEnd} isFirst={isFirst} page={page} setIsEnd={setIsEnd} setIsFirst={setIsFirst} setPage={setPage} size={size} totalSize={totalSize} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className={`col-12 col-sm-12 col-md-11 col-lg-10 col-xl-10`}>
          <div className="row px-3 px-sm-3 px-md-0 px-lg-0 px-xl-0 justify-content-start">
            {recentVideos?.map((item) => {
              return <div className="col-12 col-sm-9 mx-4 col-md-4 col-lg-3 col-xl-3 my-3">
                <div className="">
                  <h6 className=" my-3">{item.title}</h6>
                  <iframe allowFullScreen className="rounded " width={300} height={300}  src={item.youtube_url}  />

                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentLiveEventSection;
