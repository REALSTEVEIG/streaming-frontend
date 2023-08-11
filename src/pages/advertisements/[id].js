//#region Imports
import AdvertDetails from "@/components/Advertisement/Details";
import TopSection from "@/components/Advertisement/TopSection";
import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import { getAdvertisementByID } from "@/services/posts.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
//#endregion

const AdvertisementDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [advertisement, setAdvertisement] = useState({});

  const getAdvertisement = async () => {
    let result = await getAdvertisementByID(id);
    console.log("Advertisement :>>>>>>>>>>>>>", result);
    setAdvertisement(result.data);
  };

  useEffect(() => {
    getAdvertisement();
  }, []);

  return (
    <>
      <AppHead title={"Advert Details"} />
      <TopSection advert={advertisement} />
      <AdvertDetails post_body={advertisement?.description} />
      {/* <RelatedPosts posts={relatedPosts} /> */}
    </>
  );
};

const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

AdvertisementDetails.getLayout = getLayout;

export default AdvertisementDetails;
