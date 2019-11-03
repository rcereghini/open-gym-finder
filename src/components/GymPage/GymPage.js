import React from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";

const GymPage = props => {
  const gQuit = () => {
    firestore
      .collection("users")
      .doc(props.currentUser.id)
      .set({
        ...props.currentUser,
        homeGym: {
          name: "",
          id: ""
        }
      });
  };

  return (
    <div>
      <p style={{ color: "white" }}>Gym Page</p>
      <Link to={"/user"}>
        <button onClick={gQuit}>/gquit</button>
      </Link>
    </div>
  );
};

export default GymPage;
