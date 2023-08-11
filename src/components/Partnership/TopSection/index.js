import React, { useEffect, useState } from "react";
import styles from "./top.module.css";
import { getSectionBanner } from "@/services/settings.service";
import { PAGES } from "@/constants/constants";

const TopSection = () => {
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
        background: `url("${banner ? banner : "/assets/images/partnership.png"}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`row ${styles.section}`}
    >
      <div className={`col-12`}>
        <div className={`row ${styles.overlay}`}>
          <div className={`d-flex flex-column justify-content-center align-items-center`}>
            <div className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-2 p-sm-2 p-md-3 p-lg-5 p-xl-5 d-flex flex-column justify-content-center align-items-center`}>
              <h4 className={`h4 text-white fw-bold text-uppercase`}>Partnership</h4>
              <hr className="text-white my-2 border border-1" />
              <p className={`small text-white text-center text-bold ${styles.p_text}`}>
                Kingdom Television Network Global partnership program is a conduit to help make Jesus Christ’s gospel accessible worldwide and on all mass media
                platforms. With your partnership contributions, we can now provide free-to-air direct-to-home Christian programming in hard-to-reach areas of Africa and
                beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
