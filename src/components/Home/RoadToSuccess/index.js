import { road_to_success } from "@/core/data";
import React, { useEffect, useState } from "react";
import LeftItem from "./components/LeftItem";
import RightItem from "./components/RightItem";
import RoadToSuccessSectionTitle from "./components/SectionTitle";

const RoadToSuccess = () => {
  const [roadMap, setRoadMap] = useState([]);
  const getRoadMap = () => {
    setRoadMap(road_to_success);
  };
  useEffect(() => {
    getRoadMap();
  }, []);

  return (
    <div className={`row my-0 my-sm-0 my-md-5 my-lg-5 my-xl-5 px-4 px-sm-4 px-md-5`}>
      <RoadToSuccessSectionTitle />
      <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mx-auto">
        {roadMap.map((item, index) => {
          if ((index + 1) % 2 == 0) return <LeftItem key={item._id} item={item} />;
          else return <RightItem key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default RoadToSuccess;
