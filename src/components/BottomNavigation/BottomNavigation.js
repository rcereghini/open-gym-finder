import React from "react";
import { Link } from "react-router-dom";

const BottomNavigation = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "3px solid gold"
      }}
    >
      <Link
        to={"/achievements"}
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: 11,
          zIndex: 5
        }}
      >
        <h2>ACHIEVEMENTS</h2>
      </Link>
      <Link
        to={"/schedule"}
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: 11,
          zIndex: 5
        }}
      >
        <h2>SCHEDULE</h2>
      </Link>
      {/* <h1 style={{ margin: "0em", fontSize: "15px" }}>| SCHEDULE | MAIL</h1> */}
    </div>
  );
};

export default BottomNavigation;
