import React from "react";
import "./header.css";

const navigation = ["Map", "History", "Settings"];

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "3px solid gold"
      }}
    >
      <div
        className="header-buttons"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {navigation.map(item => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Header;
