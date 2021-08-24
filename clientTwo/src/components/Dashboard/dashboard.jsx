import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { SideBar } from "../Dashboard/SideNav";
import { StoreContext } from "../context/Context";
import Inbox from "../email/Inbox";
import Calendar from "../Calendar/Calendar";
import ReportsCards from "./reportCards";
import TodaysAgenda from "./TodaysAgenda";

function Dashboard() {
  const history = useHistory();
  const State = useContext(StoreContext);

  var content = (
    <div className="loading-page">
      {""}
      <img className="loading-image" src="img/logo2.png" alt="logo"></img>
      <div className="spinner-border"></div>
    </div>
  );

  if (!State.isLoading) {
    content = (
      <div className="appbody">
        <Navbar />

        <div className="maincontainer">
          <SideBar />
          <div className="studentportal">
            <h1>Student Portal</h1>
          </div>

          <div className="usercont">
            <div className="user-div">
              {State.user.image ? (
                <img alt="userimg" className="welcome-img" src="./" />
              ) : (
                <div className="user_letter">
                  {State.user &&
                    State.user.first_name.slice(0, 1).toUpperCase()}
                </div>
              )}

              <h1 className="lead mb-3">
                Welcome {State.user && State.user.first_name}
              </h1>
            </div>
          </div>
          <div className="dashboard-body">
            <div className="inboxWrapper">
              <h4 className="emailhead">Message Center</h4>
              <div className="inbox-inner-wapper">
                <Inbox />
              </div>
            </div>
            <div className="dash-body-right">
              <TodaysAgenda />
            </div>

            <div className="third-section">
              <Calendar />
              <ReportsCards />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Dashboard;
