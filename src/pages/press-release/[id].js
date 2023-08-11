//#region Imports
import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import PressDetails from "@/components/PressRelease/Details";
import RelatedPosts from "@/components/PressRelease/RelatedPosts";
import TopSection from "@/components/PressRelease/TopSection";
import { getCategoryPosts, getPostDetails } from "@/services/posts.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
//#endregion

const PressReleaseDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [press, setPress] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);

  const getPressRelease = async () => {
    let result = await getPostDetails(id);
    let post = result.data;
    if (post) {
      let related_posts = await getCategoryPosts({id:post.category_id});
      setRelatedPosts([...related_posts.data]);
    }
    setPress(result.data);
  };

  useEffect(() => {
    getPressRelease();
  }, []);

  return (
    <>
      <AppHead title={"Press Details"} />
      <TopSection pressRelease={press} />
      <PressDetails post_body={press?.post_body} />
      <RelatedPosts posts={relatedPosts} />
    </>
  );
};

const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

PressReleaseDetails.getLayout = getLayout;

export default PressReleaseDetails;
