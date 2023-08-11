import { latest_news } from "@/core/data";
import { getLatestEvents } from "@/services/posts.service";
import React, { useEffect, useState } from "react";
import styles from "./news.module.css";
import NewsItem from "./NewsItem";
const LatestNews = () => {
  const [newsItems, setNewsItems] = useState([]);

  const getNewsItems = async () => {
    let result = await getLatestEvents({});
    setNewsItems(result.data);
  };

  useEffect(() => {
    getNewsItems();
  }, []);

  return (
    <>
      <div className="row my-5 my-sm-5 my-md-4 my-lg-5 my-xl-5">
        <div className="col-12 mx-4 mx-sm-4 mx-md-4 mx-lg-5 mx-xl-5">
          <h6 className={`h6 fw-bold mb-0 ${styles.title}`}>Latest News & Events</h6>
          <small className="small ktn-text-primary fw-bold">By Omorio Cutane</small>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-2 pb-sm-2 pb-md-5 pb-lg-5 pb-xl-5 mb-2 mb-sm-2 mb-md-5 mb-lg-5 mb-xl-5 mx-auto">
          {newsItems?.map((item, index) => {
            return (
              <div key={item._id} className={`row px-3 px-sm-3 px-md-4 px-lg-5 px-xl-5 ${index % 2 == 1 && "justify-content-end"}`}>
                <NewsItem index={index} item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LatestNews;
