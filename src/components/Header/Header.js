import React from "react";
import BackButton from "../BackButton/BackButton";
import { Link } from "react-router-dom";
import "./header.css";

const navigation = ["Map", "History", "Settings"];

const Header = props => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {props.currentUser ? (
        <div
          className="header-buttons"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Link
            to={"/user"}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: 24,
              marginRight: "1.5em"
            }}
          >
            Profile
          </Link>
          <Link
            to={"/roam"}
            style={{ color: "white", textDecoration: "none", fontSize: 24 }}
          >
            Find
          </Link>
        </div>
      ) : (
        <Link
          to="/"
          style={{
            fontSize: 24,
            color: "white",
            textDecoration: "none",
            marginLeft: ".5em"
          }}
        >
          Back
        </Link>
      )}
    </div>
  );
};

export default Header;
