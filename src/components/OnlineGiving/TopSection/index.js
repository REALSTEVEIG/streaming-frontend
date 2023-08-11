//#region Imports
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./top.module.css";
import { getSectionBanner } from "@/services/settings.service";
import { PAGES } from "@/constants/constants";
//#endregion

const TopSection = ({}) => {
  const router = useRouter();
  const [banner, setBanner] = useState("");
  const getBanner = async () => {
    let result = await getSectionBanner(PAGES.ADVERTISEMENT_BANNER);
    if (result.success) {
      setBanner(result.data?.image_url);
    }
  };
  useEffect(() => {
    getBanner();
  }, []);
  return (
    <section
      style={{
        background: `url("${banner ? banner : "/assets/images/giving-baner.png"}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`row ${styles.section}`}
    >
      <div className={`row ${styles.overlay}`}>
        <div className={`d-flex flex-column justify-content-center align-items-center`}>
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-2 p-sm-2 p-md-3 p-lg-5 p-xl-5 d-flex flex-column justify-content-start align-items-start ${styles.titleContainer}`}
          >
            <h4 className={`h4 text-white`}>{`Church Offering`}</h4>
            <div className={`bg-white w-100 my-2 border border-1 ${styles.hr}`} />
            <p className={`small text-white text-start ${styles.p_text}`}>
              {`The offering in Christianity is a gift  money to the Church beyond a Christian’s payment of h/her tithes.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
