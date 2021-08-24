import { useContext, useEffect } from "react";
import "./assets/css/main.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoute from "./Protected-routes/ProtectedRoute";
import { StoreContext } from "./components/context/Context";

// ********* importing the react components**********
import Login from "./components/Login/Login";
import { CodeEditor } from "./components/code-editors/CodeEditor";
import Compose from "./components/email/Compose";
import { Mailbox } from "./components/email/Mailbox";
import ToDoList from "./components/ToDoList/ToDoList";
import Dashboard from "./components/Dashboard/dashboard";
import { ReportCards } from "./components/ReportCardPage/reportCardPage";
import { NewCodePen } from "./components/code-editors/newcodepen";
import { Repository } from "./components/Repository/Repository";
import { HtmlChallenge } from "./components/code-editors/htmlChallenge";
import { ReactChallenge } from "./components/code-editors/reactChallenge";
import { D3CodePen } from "./components/code-editors/d3-pen";
import { CodePen } from "./components/code-editors/codepen";
import { HTMLCodeEditor } from "./components/code-editors/HTMLCodeEditor";
import { toast } from "react-toastify";
import StudentGuide from "./components/CareerReadiness/StudentGuide"
import { EBooks } from "./components/eBooks/eBooks"
import "react-toastify/dist/ReactToastify.css"; //messaging system

let mockData = {
  title: "Basic Algorithm Scripting: Convert Celsius to Fahrenheit",
  description: ` The algorithm to convert from Celsius to Fahrenheit is the temperature
  in Celsius times 9/5, plus 32. You are given a variable celsius
  representing a temperature in Celsius. Use the variable fahrenheit
  already defined and assign it the Fahrenheit temperature equivalent to
  the given Celsius temperature. Use the algorithm mentioned above to
  help convert the Celsius temperature to Fahrenheit. Don't worry too
  much about the function and return statements as they will be covered
  in future challenges. For now, only use operators that you have
  already learned`,
  editorValue: `function convertToF(celsius) {
  let fahrenheit = celsius * 9/5 + 32;
  return fahrenheit;
  }
    
    convertToF(30)`,
  tests: [
    {
      description: "convertToF(0) should return a number ",
      test: "typeof convertToF(0)",
      expected: "number",
      pass: "start",
    },
    {
      description: "convertToF(-30) should return -22 ",
      test: "convertToF(-30)",
      expected: -22,
      pass: "start",
    },
    {
      description: "convertToF(-10) should return 14 ",
      test: "convertToF(-10)",
      expected: 14,
      pass: "start",
    },
    {
      description: "convertToF(0) should return 32 ",
      test: "convertToF(0)",
      expected: 32,
      pass: "start",
    },
    {
      description: "convertToF(20) should return 68 ",
      test: "convertToF(20)",
      expected: 68,
      pass: "start",
    },
  ],
};

toast.configure(); //messaging system

function App() {
  const State = useContext(StoreContext);

  // isAuth~ if token is valid then user will Automatically be taken to dashboard
  const isAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/main/verifyStudent", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      State.setUser(parseRes.user[0]);
      State.setReportCards(parseRes.reportCards);
      parseRes.success === true
        ? State.setIsAuthenticated(true)
        : State.setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Router>
      <div className="App">
        <Route
          exact
          path="/"
          component={!State.isAuthenticated ? Login : Dashboard}
        />
        <ProtectedRoute
          exact
          path="/dashboard"
          component={State.isAuthenticated ? Dashboard : Login}
        />
        <ProtectedRoute
          exact
          path="/code-editor"
          component={CodeEditor}
          challenge={mockData}
        />
        <ProtectedRoute exact path="/compose" component={Compose} />
        <ProtectedRoute exact path="/inbox" component={Mailbox} />
        <ProtectedRoute exact path="/code-pen" component={CodePen} />
        <ProtectedRoute exact path="/reportCards" component={ReportCards} />
        <ProtectedRoute exact path="/todolist" component={ToDoList} />
        <ProtectedRoute exact path="/new-code-pen" component={NewCodePen} />
        <ProtectedRoute exact path="/code-html" component={HTMLCodeEditor} />
        <ProtectedRoute exact path="/html-challenge" component={HtmlChallenge} />
        <ProtectedRoute exact path="/react-challenge" component={ReactChallenge} />
        <ProtectedRoute exact path="/video-lib" component={Repository} />
        <ProtectedRoute exact path="/d3-pen" component={D3CodePen} />
        <ProtectedRoute exact path="/student-guide" component={StudentGuide} />
        <ProtectedRoute exact path="/eBooks" component={EBooks} />
      </div>
    </Router>
  );
  // return(
  // <div className="loading-page">
  //    <img className='loading-image' src='img/logo2.png' alt='logo'></img>
  //   <div className='spinner-border'>
  // </div>
  // </div>
  // )
}

export default App;
