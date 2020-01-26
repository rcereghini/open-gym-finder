import React, { Fragment } from "react";
import "./modal.css";

const Modal = props => {
  const { innerText, setInactive } = props;

  return (
    <Fragment>
      <div className="modal-outer">
        <div className="modal-inner">
          <span
            className="close-icon"
            style={{ fontSize: "16px" }}
            onClick={() => setInactive()}
          >
            x
          </span>
          <p style={{ fontSize: "16px" }}>{innerText}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
