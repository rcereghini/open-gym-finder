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
    allDay: true,
    banana: "pajamas"
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
      views={["month", "agenda"]}
      onDrillDown={e => console.log("onDrillDown", e)}
      onSelectEvent={e => console.log("onSelectEvent", e)}
    />
  </div>
);

export default UserCalendar;
