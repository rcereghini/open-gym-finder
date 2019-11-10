import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../assets/calendar/calendar.css";

const localizer = momentLocalizer(moment);
let myEventsList = [
  {
    title: "banana",
    start: moment(),
    end: moment(),
    allDay: true
    // resource?: any,
  }
];

const UserCalendar = props => (
  <div style={{ fontSize: ".5em", marginTop: "2em" }}>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      views={["month"]}
    />
  </div>
);

export default UserCalendar;
