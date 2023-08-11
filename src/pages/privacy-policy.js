import Layout from "@/components/Layout";
import TopSection from "@/components/PrivacyPolicy/TopSection";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <TopSection />
    </>
  );
};

const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

PrivacyPolicy.getLayout = getLayout;

export default PrivacyPolicy;
