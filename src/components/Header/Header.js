import React from "react";
import BackButton from "../BackButton/BackButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import avatar01 from "../../assets/avatar01.png";
import "./header.css";

const navigation = ["Map", "History", "Settings"];

const Header = props => {
  return (
    <div
      className="header-main-div"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {props.currentUser ? (
        <div
          className="header-buttons"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Link
            to={"/user"}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: 16
              // marginRight: "1.5em"
            }}
          >
            <img className="header-avatar-image" src={avatar01} />
          </Link>
          <Link
            to={"/settings"}
            style={{
              color: "white",
              alignSelf: "flex-end"
            }}
          >
            <FontAwesomeIcon
              icon={faCog}
              className="header-icon-styles"
            ></FontAwesomeIcon>
          </Link>
        </div>
      ) : (
        <Link
          to="/"
          style={{
            fontSize: 16,
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
