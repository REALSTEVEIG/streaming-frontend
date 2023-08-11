//#region Imports
import { getFormattedShortDate } from "@/core/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GiBackwardTime } from "react-icons/gi";
import { GrFormNext } from "react-icons/gr";
import styles from "./styles.module.css";
//#endregion

const PressReleaseItem = ({ item }) => {
  return (
    <div className={`col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4`}>
      <div className={`card border-0`}>
        <div className={`card-body`}>
          <Image
            priority
            width={285}
            height={170}
            alt={"image"}
            src={
              item?.tertiary_image_url?.includes("http")
                ? item?.tertiary_image_url
                : `${item?.tertiary_image_url ? "http://" : ""}${item?.tertiary_image_url ?? "/assets/images/press/image1.png"}`
            }
            className={`mx-auto img-responsive ${styles.image}`}
          />
          <h6 className={`h6 fw-bold text-capitalize ${styles.title} `}>{item?.title}</h6>
          <small className={`small ktn-text-primary fw-bold ${styles.small_text}`}>
            <GiBackwardTime size={20} /> &nbsp; {getFormattedShortDate(item?.date_of_release ?? Date.now())}
          </small>
          <p className={`small text-capitalize`} style={{ marginBottom: item?.description?.length < 110 ? 10 : 0 }}>
            {item?.description.substring(0, 110)}
          </p>
          <Link href={`/press-release/${item._id}`} className={`btn btn-primary text-white ${styles.button}`}>
            Read More <GrFormNext className={`${styles.more_icon}`} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PressReleaseItem;
