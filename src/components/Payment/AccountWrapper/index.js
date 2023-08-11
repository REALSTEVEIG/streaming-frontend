import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
const AccountWrapper = ({ onAlternative, children, title, alternative }) => {
  return (
    <div className="row justify-content-center py-5">
      <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="card border-0">
                  <div className="card-header d-flex flex-row justify-content-between">
                    <small className="small ktn-text-primary fw-bold d-flex align-items-center">
                      <span className={`${styles.disc} ${styles.activeDisc}`}>01</span>
                      {title}
                    </small>
                    <Link href={"#"} className={`btn btn-secondary border text-muted bg-light px-4`} onClick={onAlternative}>
                      {alternative}
                    </Link>
                  </div>
                  <div className="card-body table-responsive">
                    <div className="row">
                      <div className="col-12 py-4">{children}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountWrapper;
