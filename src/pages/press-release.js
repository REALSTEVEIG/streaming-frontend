//#region Imports
import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import Pagination from "@/components/Pagination";
import PressReleaseSection from "@/components/PressRelease/PressReleaseSection";
import TopSection from "@/components/PressRelease/TopSection";
import { getAllCategories, getCategoryPosts, getPosts } from "@/services/posts.service";
import React, { useEffect, useState } from "react";
//#endregion

const PressRelease = () => {
  const [pressReleases, setPressReleases] = useState([]);
  const [recordsToShow, setRecordsToShow] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(9);
  const [limit, setLimit] = useState(9);
  const [totalSize, setTotalSize] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  const getPressReleases = async () => {
    let result = await getPosts({ page, size, limit });
    setTotalSize(result.count);
    if (Math.ceil(result.count/size) <= 1) setIsEnd(true);
    else setIsEnd(false);

    if (page > 0) setIsFirst(false);
    else setIsFirst(true);
    setPressReleases(result.data);
    setRecordsToShow(result.data);
  };

  const filterPressRelease = async (event, category_id) => {
    event.preventDefault();
    if (!category_id || category_id == "all") {
      setActiveTab("all");
      setRecordsToShow([...pressReleases]);
      return;
    }
    // let result = await getCategoryPosts({id: category_id});
    // console.log("Category ID :>>>>>>>>>>>>>>", category_id);

    setRecordsToShow([...pressReleases.filter((item) => item.category_id == category_id)]);
    // setRecordsToShow(result?.data);
    setActiveTab(category_id);
  };

  const getCategories = async () => {
    let result = await getAllCategories();
    setCategories(result.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getPressReleases();
  }, [page]);

  return (
    <>
      <AppHead title={"Press Release"} />
      <TopSection categories={categories} activeTab={activeTab} onTabChange={filterPressRelease} />
      <PressReleaseSection items={recordsToShow} title={"Recent Releases"}>
        <Pagination isEnd={isEnd} isFirst={isFirst} page={page} setIsEnd={setIsEnd} setIsFirst={setIsFirst} setPage={setPage} size={size} totalSize={totalSize} />
      </PressReleaseSection>
    </>
  );
};

const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

PressRelease.getLayout = getLayout;

export default PressRelease;
