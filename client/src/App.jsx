// Importing all plugins fom react
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { toast } from "react-toastify"; //messaging system

// Importing all css for the app
import "./assets/css/Admin/Login/admin.css";
import "./assets/css/Admin/Toastify/toastify.css";
import "./assets/css/Admin/Modal/modal.css";
import "./assets/css/Admin/Login/register.css";
import "./assets/css/Admin/header/header.css";
import "./assets/css/Admin/Dashboard/dashboard.css";
import "./assets/css/Admin/Modal/DeleteModal.css";
import "./assets/css/Admin/nav/nav.css";
import "./assets/css/Admin/students/studentFinder.css";
import "./assets/css/Admin/students/addStudents.css";
import "./assets/css/Admin/students/editStudent.css";
import "./assets/css/Admin/students/reportCard.css";
import "./assets/css/Admin/students/studentPage.css";
import "./assets/css/Admin/Calendar/calendar.css";
import "./assets/css/Admin/TodaysAgenda/TodaysAgenda.css";
import "./assets/css/Admin/Mail/inbox.css";
import "./assets/css/Admin/VideosStyles/VideoLib.css";
import "./vender/font-awesome/css/all.css"; // font awesome
import "./assets/css/Admin/AgendaMaker/AgendaMaker.css"
import "react-toastify/dist/ReactToastify.css"; //messaging system

// Importing all components for React router
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";
import Workstation from "./components/Workstation/Workstation";
import EditAdmin from "./components/EditAdmin/EditAdmin";
import StudentDetailPage from "./components/StudentDetailPage";
// import StudentUpdate from "./components/StudentUpdate";
import Header from "./components/navStuff/Header";
import Compose from "./components/email/Compose";
import { Mailbox } from "./components/email/Mailbox";
import {VideoLib} from "./components/videoLib/VideoLib";

// Importing the context store
import { MainContextProvider } from "./components/context/MainContext";
//messaging system
toast.configure();

function App() {
  // Setting variables for the local state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  // isAuth~ if token is valid then user will Automatically be taken to dashboard
  const isAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/authInstructor/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <MainContextProvider>
      <Router>
        <div className="App-admin-container">
          {isAuthenticated ? <Header setAuth={setAuth} /> : null}
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/workstation"
              render={(props) =>
                isAuthenticated ? (
                  <Workstation {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/student/:id"
              render={(props) =>
                isAuthenticated ? (
                  <StudentDetailPage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/email"
              render={(props) =>
                isAuthenticated ? (
                  <Compose {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/mailbox"
              render={(props) =>
                isAuthenticated ? (
                  <Mailbox {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/editAdmin"
              render={(props) =>
                isAuthenticated ? (
                  <EditAdmin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/videoLib"
              render={(props) =>
                isAuthenticated ? (
                  <VideoLib {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </MainContextProvider>
  );
}

export default App;
