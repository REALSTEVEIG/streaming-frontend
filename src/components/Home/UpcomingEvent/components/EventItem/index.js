import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./item.module.css";

const EventItem = ({ eventItem }) => {
  return (
    <Link href={`press-release/${eventItem._id}`} className="col-12 col-sm-6 col-md-5 col-lg-3 col-xl-3 nav-link">
      <div className="card border-0">
        <div className="card-body d-flex flex-row justify-content-center">
          <Image
            priority
            className={`${styles.image}`}
            src={
              eventItem?.primary_image_url?.includes("http")
                ? eventItem?.primary_image_url
                : `${eventItem?.secondary_image_url ? "http://" : ""}${eventItem?.primary_image_url ?? "/public/assets/images/image1.png"}`
            }
            width={200}
            height={350}
            alt={"Image"}
          />
        </div>
      </div>
    </Link>
  );
};

export default EventItem;
