import React from "react";

const ComingSoonBody = () => {
  return (
    <div className="row coming_soon">
      <div className="col-12 d-flex flex-column justify-content-center align-items-center coming_soon_overlay">
        <h2 className={`h2 coming_soon_title`}>Something Big Is Coming Your Way</h2>
        <h2 className={`h2 sub_title`}>We’re coming soon!</h2>
        <div className="row w-100">
          <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 d-flex flex-row justify-content-between m-auto">
            <button className="btn btn-primary" type="button">
              Notify Me
            </button>
            <button className="btn btn-secondary bg-light ktn-text-primary" type="button">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonBody;
