//#region Imports
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./top.module.css";
import { getSectionBanner } from "@/services/settings.service";
import { PAGES } from "@/constants/constants";
//#endregion

const TopSection = ({ activeTab, onTabChange, pressRelease, categories }) => {
  const router = useRouter();
  const [banner, setBanner] = useState("");
  const getBanner = async () => {
    let result = await getSectionBanner(PAGES.PRESS_BANNER);
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
        background: `url("${banner ? banner : "/assets/images/press-release-bg.png"}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`row ${styles.section} m-auto`}
    >
      <div className={`row ${styles.overlay} m-auto`}>
        <div className={`d-flex flex-column justify-content-center align-items-center`}>
          <div className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-4 p-sm-4 p-md-4 p-lg-5 p-xl-5 d-flex flex-column justify-content-start align-items-start`}>
            <h4 className={`h4 text-white text-uppercase`}>{`${pressRelease ? pressRelease.title : "PRESS"}`}</h4>
            <div className={`bg-white w-100 my-2 border border-1 ${styles.hr}`} />
            <p className={`small text-white text-start fw-bold ${styles.p_text}`}>
              {`${
                pressRelease
                  ? pressRelease.description
                  : "Sign up for email alerts informing you of news release, financial reports , and partners events. if you are not a journaiist but have a questions about kingdom television network or nations for christ ministerial church inc.., please refer to our contact us section to find out appro- riate departement to answer your question."
              }`}
            </p>
          </div>
          {!pressRelease && (
            <div className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 w-100 ${styles.bottom_title}`}>
              <nav className={`navbar py-0 navbar-expand navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-expand-xl bg-transparent`}>
                <div className="container-fluid bg-transparent">
                  <div className={`collapse navbar-collapse d-flex flex-row bg-transparent justify-content-center ${styles.mid_nav}`} id="press_nav_bar">
                    <ul className={`navbar-nav mb-2 mb-lg-0`}>
                      <li className="nav-item px-3 px-sm-3 px-md-3 px-lg-4 px-xl-4">
                        <Link
                          className={`nav-link text-white ${styles.mobileText} ${activeTab == "all" && styles.active}`}
                          aria-current="page"
                          href="#"
                          onClick={(event) => {
                            onTabChange(event, "all");
                          }}
                        >
                          All
                        </Link>
                      </li>
                      {categories?.slice(0, 3)?.map((item, index) => {
                        return (
                          <li key={item._id} className="nav-item px-3 px-sm-3 px-md-3 px-lg-4 px-xl-4">
                            <Link
                              className={`nav-link text-white ${activeTab == item._id && styles.active}`}
                              onClick={(event) => {
                                onTabChange(event, item._id);
                              }}
                              href="#"
                            >
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          )}
          {pressRelease && (
            <Link href={"/press-release"} className={`btn btn-secondary px-5 ${styles.back_button}`}>
              <AiOutlineArrowLeft /> Back to List
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSection;
