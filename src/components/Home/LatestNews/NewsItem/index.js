//#region Imports
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AgendaItem from "../AgendaItem";
import ScheduleItem from "../ScheduleItem";
import styles from "./news.module.css";
//#endregion

const NewsItem = ({ item, index }) => {
  return (
    <Link href={`press-release/${item._id}`} className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 px-3 my-3 nav-link`}>
      <div className={`card bg-transparent shadow-lg ${styles.overlay}`}>
        <div className={`card-body`}>
          <div className={`row`}>
            <div className={`col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4`}>
              <Image
                priority
                width={150}
                height={100}
                src={
                  item?.secondary_image_url?.includes("http")
                    ? item?.secondary_image_url
                    : `${item?.secondary_image_url ? "http://" : ""}${item?.secondary_image_url ?? "/assets/images/news-image1.png"}`
                }
                alt="image"
                className={`${styles.image}`}
              />
            </div>
            <div className={`col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8`}>
              {item.speaker_name && <h6 className={`h6 ${styles.speaker_name}`}>{item.speaker_name}</h6>}
              <h4 className={`h4 ${styles.title}`}>{item.title}</h4>
              <p className={`p ${styles.description}`}>{item.description}</p>
              {item.schedule && <ScheduleItem schedule={item?.schedule} />}
              {item.agenda && <AgendaItem agenda={item?.agenda} />}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsItem;
