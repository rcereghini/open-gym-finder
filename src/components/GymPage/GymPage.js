import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";

const GymPage = props => {
  const [redirect, setRedirect] = useState(false);
  return (
    <div>
      <p style={{ color: "white" }}>Gym Page</p>
      {/* <Link to={"/user"}> */}
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
            })
            .then(() => setRedirect(true));
        }}
      >
        /gquit
      </button>
      {/* </Link> */}
      {redirect ? <Redirect push to="/user" /> : null}
    </div>
  );
};

export default GymPage;
