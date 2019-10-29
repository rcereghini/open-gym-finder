import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faCalendarAlt,
  faMapMarkedAlt
} from "@fortawesome/free-solid-svg-icons";

import "./bottomNavigation.css";

const BottomNavigation = () => {
  return (
    <div className="bottom-nav-main">
      <Link to={"/achievements"} className="link-styles">
        <FontAwesomeIcon icon={faTrophy} className="icon-styles" />
      </Link>
      <Link to={"/roam"} className="link-styles">
        <FontAwesomeIcon icon={faMapMarkedAlt} className="icon-styles" />
      </Link>
      <Link to={"/schedule"} className="link-styles">
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="icon-styles"
        ></FontAwesomeIcon>
      </Link>
    </div>
  );
};

export default BottomNavigation;
