import React from "react";
import { useHistory } from "react-router-dom";

function SideNav() {
  const history = useHistory();
  // simple function for buttons to navigate to other components
  // and if nessissary pass something thru props
  const onClickNav = (path, prop) => {
    history.push(path, prop);
  };
  return (
    <div className="side-nav">
      <div className="sideNav-container-for-btns">
      <button
          className="btn-anchor-side-nav"
          onClick={() => onClickNav("/mailbox")}
        >
          Inbox
        </button>
        <button
          className="btn-anchor-side-nav"
          onClick={() => onClickNav("/workstation")}
        >
          Agenda
        </button>
        <button
          className="btn-anchor-side-nav"
          onClick={() => onClickNav("/videoLib")}
        >
          Repository
        </button>
        <button
          className="btn-anchor-side-nav"
          onClick={() => onClickNav("/editAdmin")}
        >
          Edit Admin
        </button>
      </div>

      <img className="teacher-side-logo" src="./logo2.png" alt="logo"></img>
    </div>
  );
}

export default SideNav;
