import React from "react";
import PressReleaseSection from "../PressReleaseSection";
import styles from "./styles.module.css";
const RelatedPosts = ({ posts }) => {
  return (
    <>
      <div className="row my-5 justify-content-center">
        <div className="col-10">
          <h6 className={`small ktn-text-primary fw-bold text-center mb-0`}>Related Posts</h6>
          <div className={`my-2 ${styles.hr}`} />
        </div>
      </div>

      <PressReleaseSection items={posts} />
    </>
  );
};

export default RelatedPosts;
