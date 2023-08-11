//#region Imports
import Link from "next/link";
import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import AdvertItem from "../AdvertItem";
import styles from "./styles.module.css";
//#endregion

const AdvertSection = ({ items, children }) => {
  return (
    <section className={`row my-5`}>
      <div className={`col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 m-auto px-4 px-sm-4 px-md-4 px-lg-4 px-xl-4 `}>
        <h6 className={`h6 fw-bold mb-4`}>Advertisement</h6>
        {children}
      </div>
      <div className={`col-12 col-sm-12 col-md-10 col-lg-9 col-xl-9 mx-auto`}>
        {items.map((item, index) => {
          return (
            <div key={item._id} className={`row mx-auto justify-content-between my-5`}>
              <AdvertItem index={index} item={item} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdvertSection;
