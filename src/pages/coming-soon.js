import ComingSoonBody from "@/components/CommingSoon/Body";
import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import React from "react";
const ComingSoon = () => {
  return (
    <>
      <AppHead title={"Coming Soon"} />
      <ComingSoonBody />
    </>
  );
};

const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

ComingSoon.getLayout = getLayout;

export default ComingSoon;
