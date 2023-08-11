import React from "react";

const PressDetails = ({ post_body }) => {
  return (
    <section className={`row my-5`}>
      <div className={`col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 m-auto px-4 px-sm-4 px-md-4 px-lg-4 px-xl-4`}>
        <div dangerouslySetInnerHTML={{ __html: post_body }}></div>
      </div>
    </section>
  );
};

export default PressDetails;
