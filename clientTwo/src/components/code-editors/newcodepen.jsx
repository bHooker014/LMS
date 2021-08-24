import React, { useState, useRef, useEffect } from "react";
import { Editor } from "./editor";
import { Modal } from "../Modals/Modal";
import {useHistory} from "react-router-dom";

require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
export const NewCodePen = (props, ref) => {
  const modalRef = useRef();
  const history = useHistory()
  const [html, setHtml] = useState(`<button onclick="myFunction()">Click me</button>\n
  <h1 id="demo"></h1>`);
  const [css, setCss] = useState(`body {\n color: white;\n}`);
  const [js, setJs] = useState(`function myFunction() {\n
    document.getElementById("demo").innerHTML = "Hello World";\n
  }`);
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
<script src="./d3.min.js"></script>
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


  return (
    <div className="new-code">
      <Modal ref={modalRef}>
        <button onClick={() => setJqUse(true)}>Jquery on</button>

        <select onChange={(e) => setTheme(e.target.value)} id="select">
          <option selected="">default</option>
          <option>3024-day</option>
          <option>3024-night</option>
        </select>
      </Modal>
     
      <div className="mail-top">
        <div className="mail-logo">
          <div onClick={() => {history.push("/dashboard")}}>
          <i className="fas fa-home fa-2x"></i>
          </div>
          <div className="inbox-title">Code-Pen</div>
          </div>
        <div
        onClick={() => {
          console.log("click");
          modalRef.current.openModal();
        }}
        >
        {" "}
        <i className="fa fa-cog fa-2x"></i>
      </div>
      </div>

      <div className="pane top-pane">
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

        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
          theme={theme}
        />
      </div>
      <div className="pane">
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
