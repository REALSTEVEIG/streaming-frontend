import React, { useEffect, useState } from "react";
import styles from "./top.module.css";
import { getSectionBanner } from "@/services/settings.service";
import { PAGES } from "@/constants/constants";

const TopSection = ({advert}) => {
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
      <div className={`col-12`}>
        <div className={`row ${styles.overlay}`}>
          <div className={`d-flex flex-column justify-content-center align-items-center`}>
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 px-3 px-sm-3 px-md-3 px-lg-4 px-xl-4 d-flex flex-column justify-content-center align-items-center`}
            >
              <h4 className={`h4 text-white fw-bold text-uppercase`}>{ advert?.title ? advert?.title : 'ADVERTISEMENT'}</h4>
              <hr className="text-white my-2 border border-1" />
              <p className={`small text-white text-center ${styles.p_text}`}>
                {advert?.sub_title ? advert.sub_title : `Kingdom Television Network (“KingdomTV”) provides access to a global christian audience of engaged consumers for christian friendly brands and publishers.
                Across TV, digital and social, our trusted brand ensures a christian space for advertisers and our commitment to quality content enables us to provide a
                strategic platform for content distribution and licensing.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
