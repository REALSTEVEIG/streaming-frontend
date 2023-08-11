import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import AppHead from "@/components/Layout/Head";
import Layout from "@/components/Layout";
import TopSection from "@/components/Home/Top";
import UpcomingEvents from "@/components/Home/UpcomingEvent";
import RoadToSuccess from "@/components/Home/RoadToSuccess";
import GlobalNetwork from "@/components/Home/GlobalNetwork";
import LatestNews from "@/components/Home/LatestNews";
import VideoPlayer from "@/components/VideoPlayer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <AppHead title={"Home"} />
      <TopSection />
      {/* <VideoPlayer videoSource={"https://res.cloudinary.com/codelife/video/upload/v1637805738/intro_l5ul1k.mp4"} /> */}
      <UpcomingEvents />
      <RoadToSuccess />
      <GlobalNetwork />
      <LatestNews />
    </>
  );
}
const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
Home.getLayout = getLayout;
