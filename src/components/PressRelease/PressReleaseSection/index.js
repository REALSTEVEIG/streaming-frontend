//#region Imports
import React from "react";
import styles from "./videos.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import PressReleaseItem from "../PressReleaseItem";
import Link from "next/link";
//#endregion

const PressReleaseSection = ({ items, title, children }) => {
  return (
    <section className={`row my-5`}>
      <div className={`col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 m-auto px-4 px-sm-4 px-md-4 px-lg-4 px-xl-4 ${styles.video_container}`}>
        {title && <h6 className={`h6 fw-bold mb-4`}>{title}</h6>}
        {children}
      </div>
      <div className={`col-12 col-sm-12 col-md-10 col-lg-9 col-xl-9 mx-auto my-4 ${styles.video_container}`}>
        <div className={`row mx-auto`}>
          {items?.map((item, index) => {
            return <PressReleaseItem key={item._id} item={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default PressReleaseSection;
