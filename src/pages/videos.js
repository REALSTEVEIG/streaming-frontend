//#region Imports
import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import Pagination from "@/components/Pagination";
import TopSection from "@/components/Videos/TopSection";
import VideoSection from "@/components/Videos/VideoSection";
import VideosSection from "@/components/Videos/VideosSection";
import { getAllVideos } from "@/services/posts.service";
import React, { useEffect, useState } from "react";
//#endregion

const Videos = () => {
  const [videos, setVideos] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [limit, setLimit] = useState(12);
  const [totalSize, setTotalSize] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  const getVideos = async () => {
    let result = await getAllVideos({ page, size, limit });
    setTotalSize(result.count);
    if (Math.ceil(result.count/size) <= 1) setIsEnd(true);
    else setIsEnd(false);

    if (page > 0) setIsFirst(false);
    else setIsFirst(true);
    setVideos(result.data);
  };
  useEffect(() => {
    getVideos();
  }, [page]);

  return (
    <>
      <AppHead title={"Videos"} />
      <TopSection />
      <VideoSection video={videos ? videos[0] : null} />
      <VideosSection videos={videos}>
        <Pagination isEnd={isEnd} isFirst={isFirst} page={page} setIsEnd={setIsEnd} setIsFirst={setIsFirst} setPage={setPage} size={size} totalSize={totalSize} />
      </VideosSection>
    </>
  );
};

const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

Videos.getLayout = getLayout;

export default Videos;
