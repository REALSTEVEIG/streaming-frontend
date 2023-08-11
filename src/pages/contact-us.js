import TopSection from "@/components/ContactUs/TopSection";
import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <AppHead title={"Contact Us"} />
      <TopSection />
    </>
  );
};

const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

ContactUs.getLayout = getLayout;

export default ContactUs;
