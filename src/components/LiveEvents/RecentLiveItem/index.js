//#region Imports
import Link from "next/link";
import React from "react";
import styles from "./recent.module.css";
//#endregion

const RecentLiveItem = ({ item }) => {
  return (
    // <Link href={`/live-events/${item?.post[0]?._id}`} className="col-12 col-sm-9 col-md-4 col-lg-3 col-xl-3 my-3 text-decoration-none">
    <Link href={`/coming-soon`} className="col-12 col-sm-9 col-md-4 col-lg-3 col-xl-3 my-3 text-decoration-none">
      <div className={`card border-0 ${styles.card}`}>
        <div
          className={`card-body p-0`}
          style={{
            background: `url('${item.secondary_postal_url}')`,
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <div className={`col-12  d-flex flex-column justify-content-between ${styles.card_overlay}`}>
            <div className="col-12 d-flex flex-row justify-content-between align-content-center">
              <span className={`px-3 mt-3 py-1 ${styles.details}`}>Details</span>
              <span className={`small text-white px-3 mt-3 py-1 ${styles.time}`}>{item.time}</span>
            </div>
            <div className="col-12 ps-2 pb-3 d-flex flex-row justify-content-between align-content-center">
              <div className="d-flex flex-column">
                <small className="small fw-bold ktn-text-primary mb-0">{item?.post[0]?.title}</small>
                <small className="small text-white">{item.owner}</small>
              </div>
              {item.status == "live" && <span className={`small text-white px-3 mt-3 py-1 ${styles.live}`}>Live</span>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecentLiveItem;
