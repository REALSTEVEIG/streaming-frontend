import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import LiveEventSection from "@/components/LiveEvents/LiveEventSection";
import RecentLiveEventSection from "@/components/LiveEvents/RecentLiveEventsSection";
import TopSection from "@/components/LiveEvents/TopSection";
import React from "react";

const LiveEvents = () => {
  return (
    <>
      <AppHead title={"Live Events"} />
      <TopSection />
      <LiveEventSection />
      <RecentLiveEventSection />
    </>
  );
};
const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
LiveEvents.getLayout = getLayout;

export default LiveEvents;
