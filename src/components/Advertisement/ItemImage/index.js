import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
const ImageItem = ({ image_url, direction }) => {
  return (
    <div className={`col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 ${styles.imageContainer}`}>
      <Image
        priority
        width={213}
        height={100}
        src={image_url?.includes("http") ? image_url : `${image_url ? "http://" : ""}${image_url ?? "/assets/images/advert1.png"}`}
        className={`${styles.firstImage}`}
        alt={"image"}
      />
    </div>
  );
};

export default ImageItem;
