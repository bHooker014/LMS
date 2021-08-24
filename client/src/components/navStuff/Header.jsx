import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../context/MainContext";
import { useHistory } from "react-router-dom";

const Header = ({ setAuth }) => {
  const state = useContext(MainContext);
  const [name, setName] = useState("");
  const history = useHistory();

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      const parseData = await res.json();
      setName(parseData[0].instructor_name);
      state.setInstructor(parseData[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  //logout handler
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token"); //removing token from localStorage
    setAuth(false);
    history.push("/");
  };

  return (
    <div className="nav-header-container">
      <h4 className="welcome">Welcome {name}</h4>
      <div className="nav-container-btns">
        <button onClick={() => history.push("/")} className="btn-home">
          Home
        </button>
        <button onClick={(e) => logout(e)} className="btn-logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
