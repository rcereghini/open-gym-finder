import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../assets/calendar/calendar.css";

const localizer = momentLocalizer(moment);

const UserCalendar = props => {
  let events = [];
  props.schedule.forEach((item, i) => {
    let startDate = new Date(item.startTime);
    let startTime = moment(startDate);
    let endDate = new Date(item.endTime);
    let endTime = moment(endDate);
    events.push({
      id: i,
      title: item.title,
      start: startDate,
      end: endDate,
      allDay: true
    });
  });

  console.log("events ===>", events);

  return (
    <div style={{ fontSize: ".5em", marginTop: "2em" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month"]}
        onDrillDown={e => console.log("onDrillDown", e)}
        onSelectEvent={e => console.log("onSelectEvent", e)}
      />
    </div>
  );
};

export default UserCalendar;
