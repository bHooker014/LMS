import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { Editor } from "./editor";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
export const HtmlChallenge = (props, ref) => {
  const history = useHistory();
  const [tests, setTests] = useState([
    {
      description: `Your h1 element should have the text "Hello World". `,
      test: '.querySelector("h1").innerText == "Hello World"',
      expected: "Hello World",
      pass: "start",
    },
  ]);

  const [html, setHtml] = useState("");
  const [css, setCss] = useState(`* {\n background: white\n}`);
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [theme, setTheme] = useState("material");
  const [jqUse, setJqUse] = useState(false);

  const jq = jqUse
    ? `<script src="./Jquery/jquery-3.4.1.min.js"></script>`
    : "";
  const eventListener = `window.addEventListener('message', event=>{
  
        let result = eval(event.data)
        console.log(result)
      })`;

  useEffect(() => {

    const timeout = setTimeout(() => {
      setSrcDoc(`
              <html>
      <head>
  ${jq}
      </head>
  <body>${html}</body>
  <style>${css}</style>
  <script>${eventListener}</script>
  <script>${js}</script>
  </html>
  `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const runStuff = () => {
    let myFrame = document.getElementById("myFrame");
    let codeDoc = myFrame.contentWindow.document;

    console.log(Array.from(codeDoc.querySelectorAll("h1")));
    tests.forEach((t) => {
      let teststr = `document.getElementById('myFrame').contentWindow.document${t.test}`;

      try {
        if (eval(teststr)) {
          console.log("pass");
          t.pass = true;
        } else {
          console.log("fail");
          t.pass = false;
        }
      } catch (e) {
        console.log(e);
        t.pass = false;
      }
    });
  };
  return (
    <div className="html-challenge">
      <div className="challenge-pane">
        <div
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          <i className="fas fa-home fa-2x"></i>
        </div>
        <h1>title</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
          explicabo tempore ipsa, possimus minus impedit. Ipsam dicta
          accusantium distinctio repudiandae eos facilis officiis eius iusto non
          vel, earum blanditiis maxime?
        </p>
        <div className="tests">
          {tests.map((t, i) => {
            return (
              <div className="test-items" key={i}>
                {t.pass === "start" ? <Start /> : t.pass ? <Check /> : <Fail />}
                <div>{t.description}</div>
              </div>
            );
          })}
        </div>
        <button onClick={() => runStuff()}>run test</button>
      </div>
      <div className="code-pane">
        <Editor
          language="xml"
          displayName="html"
          value={html}
          onChange={setHtml}
          theme={theme}
        />

        <Editor
          language="css"
          displayName="css"
          value={css}
          onChange={setCss}
          theme={theme}
        />
      </div>
      <div className="display-pane">
        <iframe
          id="myFrame"
          srcDoc={srcDoc}
          frameBorder="0"
          title="output"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

const Check = (props) => {
  return (
    <>
      <span className="sr-only">Passed</span>
      <svg
        height="50"
        viewBox="0 0 200 200"
        width="50"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g>
          <title>Passed</title>
          <circle
            cx="100"
            cy="99"
            fill="#60C7CD"
            r="95"
            stroke="#60C7CD"
            strokeDasharray="null"
            strokeLinecap="null"
            strokeLinejoin="null"
          />
          <rect
            fill="#ffffff"
            height="30"
            stroke="#ffffff"
            strokeDasharray="null"
            strokeLinecap="null"
            strokeLinejoin="null"
            transform="rotate(-45, 120, 106.321)"
            width="128.85878"
            x="55.57059"
            y="91.32089"
          />
          <rect
            fill="#ffffff"
            height="30"
            stroke="#ffffff"
            strokeDasharray="null"
            strokeLinecap="null"
            strokeLinejoin="null"
            transform="rotate(45, 66.75, 123.75)"
            width="80.66548"
            x="26.41726"
            y="108.75"
          />
        </g>
      </svg>
    </>
  );
};
const Fail = () => (
  <svg
    height="50"
    viewBox="0 0 200 200"
    width="50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <title>Test failed</title>
      <circle
        cx="100"
        cy="99"
        fill="#555"
        r="95"
        stroke="#555"
        strokeDasharray="null"
        strokeLinecap="null"
        strokeLinejoin="null"
      />
      <rect
        fill="#ffffff"
        height="30"
        stroke="#ffffff"
        strokeDasharray="null"
        strokeLinecap="null"
        strokeLinejoin="null"
        transform="rotate(-45, 100, 103.321)"
        width="128.85878"
        x="35"
        y="88"
      />
      <rect
        fill="#ffffff"
        height="30"
        stroke="#ffffff"
        strokeDasharray="null"
        strokeLinecap="null"
        strokeLinejoin="null"
        transform="rotate(45, 99.5, 104)"
        width="128.85878"
        x="35"
        y="88"
      />
    </g>
  </svg>
);

const Start = (props) => (
  <svg
    height="50"
    viewBox="0 0 200 200"
    width="50"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <title>Initial</title>
      <circle
        cx="100"
        cy="99"
        fill="#555"
        r="95"
        stroke="#555"
        strokeDasharray="null"
        strokeLinecap="null"
        strokeLinejoin="null"
      />
      <svg
        height="200"
        viewBox="-13 -12 50 50"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={
            "M8 1c0-.552.448-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1h-6c-" +
            ".552 0-1-.448-1-1zm13 20.554c0 1.284-1.023 2.446-2.424 " +
            "2.446h-13.153c-1.4 0-2.423-1.162-2.423-2.445 0-.35.076-.709." +
            "242-1.057l3.743-7.856c1.04-2.186 2.015-4.581 2.015-7.007v-1." +
            "635h2l-.006 2c-.087 2.623-1.09 5.092-1.973 7h3.682l4.377 9h1." +
            "496c.309 0 .52-.342.377-.644l-3.743-7.854c-1.046-2.197-2.12-4" +
            ".791-2.21-7.502v-2h2v1.635c0 2.426.975 4.82 2.016 7.006l3.743" +
            " 7.856c.165.348.241.707.241 1.057zm-12-1.054c0-.829-.671-1.5-" +
            "1.5-1.5s-1.5.671-1.5 1.5.671 1.5 1.5 1.5 1.5-.671 1.5-1.5zm2-" +
            "3.5c0-.553-.448-1-1-1-.553 0-1 .447-1 1s.447 1 1 1c.552 0 1-." +
            "447 1-1zm3 3c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 " +
            "1-1z"
          }
          fill="#fff"
        />
      </svg>
    </g>
  </svg>
);
