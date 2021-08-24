import React from "react";
import { ProgressBar } from "../navbar/progressBar";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../context/Context";

export const SideBar = (props) => {
  const state = useContext(StoreContext);

  let history = useHistory();

  return (
    <div className="side-section">
      <ul className="newsidenav flex-column ">
        <li
          className="side-item nav-item"
          onClick={() => history.push("/inbox")}
        >
          <p className="nav-link" href="">
            Inbox
          </p>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/compose")}
        >
          <a className="nav-link" href="">
            <span data-feather="shopping-cart"></span>
            Compose email
          </a>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/todolist")}
        >
          <a className="nav-link" href="">
            <span data-feather="shopping-cart"></span>
            To-Do-List
          </a>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/reportCards")}
        >
          <p className="nav-link" href="">
            Report Cards
          </p>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/video-lib")}
        >
          <p className="nav-link" href="">
            Repository
          </p>
        </li>
        <li className="side-item nav-item">
          <a
            className="nav-link"
            href="http://192.168.0.253:8000/"
            rel="noreferrer"
            target="_blank"
          >
            <span data-feather="users"></span>
            Code Camp
          </a>
        </li>
        <li className="side-item nav-item">
          <a
            className="nav-link"
            href="https://www.w3schools.com/"
            rel="noreferrer"
            target="_blank"
          >
            <span data-feather="users"></span>
            W3 Schools
          </a>
        </li>
        <li className="side-item nav-item">
          <a
            className="nav-link"
            href="https://developer.mozilla.org/en-US/"
            rel="noreferrer"
            target="_blank"
          >
            <span data-feather="users"></span>
            MDN Web Docs
          </a>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/new-code-pen")}
        >
          <p className="nav-link" href="">
            Code-Pen
          </p>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/d3-pen")}
        >
          <p className="nav-link" href="">
            D3-Pen
          </p>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/react-challenge")}
        >
          <p className="nav-link" href="">
            React-Pen
          </p>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/code-pen")}
        >
          <p className="nav-link" href="">
            JavaScript-Pen
          </p>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/code-editor")}
        >
          <p className="nav-link" href="">
            Daily Exercise
          </p>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/html-challenge")}
        >
          <p className="nav-link" href="">
            html challenge
          </p>
        </li>
        <li
          className="side-item nav-item"
          onClick={() => history.push("/student-guide")}
        >
          <p className="nav-link" href="">
            Student Guide
          </p>
        </li>

        <li
          className="side-item nav-item"
          onClick={() => history.push("/eBooks")}
        >
          <p className="nav-link" href="">
           eBooks
          </p>
        </li>

      </ul>
      <h5 className="progress-head">
        Overall Grade {state.user !== null ? state.user.Score * 10 : null}%
      </h5>
      <ProgressBar
        percent={state.user !== null ? state.user.Score * 10 : null}
      />
      {/* <h5 className='progress-head'>PCC Progress</h5>
    <span>Responsive Web Design</span>
<ProgressBar percent={100}/>
<span>Javscript Algorithims</span>
<ProgressBar percent={100}/>
<span>Front End Libraries</span>
<ProgressBar percent={75}/>
<span>Data Visualization</span>
<ProgressBar percent={40}/>
<span>APIs and Microservices</span>
<ProgressBar percent={10}/>
  */}
    </div>
  );
};
