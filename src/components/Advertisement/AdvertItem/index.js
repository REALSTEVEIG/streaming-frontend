//#region Imports
import Link from "next/link";
import React from "react";
import { GrFormNext } from "react-icons/gr";
import ImageItem from "../ItemImage";
import styles from "./styles.module.css";
//#endregion

const AdvertItem = ({ item, index }) => {
  return (
    <>
      {index % 2 == 1 && <ImageItem image_url={item?.image_url} direction={"left"} />}
      <div className={`col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 px-4`}>
        <div className={`card border-0 h-100`}>
          <div className={`card-body border-0`}>
            <h5 className={`h5 fw-bold text-uppercase`}>{item.title}</h5>
            <small className="small ktn-text-primary fw-bold">{item.sub_title}</small>
            <p className={`small ${styles.description}`}>{item.description}</p>
          </div>
          <div className="card-footer bg-transparent">
            <Link href={`advertisements/${item._id}`} className={`btn btn-primary text-white ${index % 2 == 0 ? styles.button : styles.leftButton}`}>
              Read More <GrFormNext className={`${styles.more_icon}`} />
            </Link>
          </div>
        </div>
      </div>
      {index % 2 == 0 && <ImageItem priority image_url={item?.image_url} direction={"right"} />}
    </>
  );
};

export default AdvertItem;
