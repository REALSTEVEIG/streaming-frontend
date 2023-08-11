import AdvertSection from "@/components/Advertisement/AdvertSection";
import TopSection from "@/components/Advertisement/TopSection";
import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import Pagination from "@/components/Pagination";
import { getAllAdvertisements } from "@/services/posts.service";
import React, { useEffect, useState } from "react";

const Advertisement = () => {
  const [adverts, setAdverts] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [limit, setLimit] = useState(12);
  const [totalSize, setTotalSize] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  const getAdverts = async () => {
    let result = await getAllAdvertisements({ page, size, limit });
    setTotalSize(result.count);
    if (Math.ceil(result.count/size) <= 1) setIsEnd(true);
    else setIsEnd(false);

    if (page > 0) setIsFirst(false);
    else setIsFirst(true);
    setAdverts(result.data);
  };
  useEffect(() => {
    getAdverts();
  }, []);

  return (
    <>
      <AppHead title={"Advertisement"} />
      <TopSection />
      <AdvertSection items={adverts}>
      <Pagination isEnd={isEnd} isFirst={isFirst} page={page} setIsEnd={setIsEnd} setIsFirst={setIsFirst} setPage={setPage} size={size} totalSize={totalSize} />
      </AdvertSection>
    </>
  );
};

const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

Advertisement.getLayout = getLayout;

export default Advertisement;
