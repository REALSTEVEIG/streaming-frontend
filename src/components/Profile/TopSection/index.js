import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import styles from "./top.module.css";
import { getSectionBanner } from "@/services/settings.service";
import { PAGES } from "@/constants/constants";
import { GlobalContext } from "@/context/Provider";

const TopSection = () => {
  const [banner, setBanner] = useState("");
  const { user, setUser } = useContext(GlobalContext);
  console.log("User :>>>>>>>>>>>>>>>>>", user);
  const getBanner = async () => {
    let result = await getSectionBanner(PAGES.PROFILE_BANNER);
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
        background: `url("${banner ? banner : "/assets/images/account-image.png"}")`,
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
              className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-2 p-sm-2 p-md-3 p-lg-5 p-xl-5 d-flex flex-column justify-content-center align-items-center`}
            ></div>
          </div>
        </div>
      </div>
      <h5 className={`h5 text-uppercase text-white fw-bold ${styles.profile}`}>profile</h5>
      <div className={`${styles.image_container}`}>
        <Image priority height={50} width={50} src={`${user?.image ? user?.image : '/assets/users/user_avatar.png'}`} className={`${styles.image}`} alt={"image"} />
        <span className={`${styles.edit_pen} d-flex flex-column justify-content-center align-items-center`}>
          <BsFillPencilFill size={10} color={"#ffffff"} />
        </span>
      </div>
    </section>
  );
};

export default TopSection;
