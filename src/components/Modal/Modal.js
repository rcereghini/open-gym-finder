import React, { Fragment } from "react";
import "./modal.css";

const Modal = props => {
  const { innerText, setInactive } = props;

  return (
    <Fragment>
      <div className="modal-outer">
        <div className="modal-inner">
          <span className="close-icon" onClick={() => setInactive()}>
            x
          </span>
          <p>{innerText}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
