import { upcoming_events } from "@/core/data";
import { getUpcomingEvents } from "@/services/posts.service";
import React, { useEffect, useState } from "react";
import EventItem from "./components/EventItem";
import EventSectionTitle from "./components/EventSectionTitle";

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const getEvents = async () => {
    let result = await getUpcomingEvents({});
    setUpcomingEvents(result.data);
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="row">
      <EventSectionTitle />
      <div className="col-10 mx-auto">
        <div className="row justify-content-center align-items-center">
          {upcomingEvents?.map((item) => {
            return <EventItem key={item._id} eventItem={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
