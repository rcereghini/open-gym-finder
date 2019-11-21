import React from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";

const GymPage = props => {
  return (
    <div>
      <p style={{ color: "white" }}>Gym Page</p>
      <Link to={"/user"}>
        <button
          onClick={() => {
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
          }}
        >
          /gquit
        </button>
      </Link>
    </div>
  );
};

export default GymPage;
