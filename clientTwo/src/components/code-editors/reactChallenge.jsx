import React, { useState, useEffect } from "react";
import { Editor } from "./editor";
import { transform } from "@babel/standalone";
import { getSrcDoc } from "./getHtml";
import { useHistory } from "react-router-dom";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/jsx/jsx");
export const ReactChallenge = (props, ref) => {
const history = useHistory();
  const IntialCode = `class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          visibility: false
        };
        // change code below this line
       this.toggleVisibility = this.toggleVisibility.bind(this)
        // change code above this line
      }
      // change code below this line
      toggleVisibility() {
        
          this.setState(state=> ({
            visibility: !state.visibility
          }))
      
      }
      // change code above this line
      render() {
        if (this.state.visibility) {
          return (
            <div>
              <button onClick={this.toggleVisibility}>Click Me</button>
              <h1>Now you see me!</h1>
            </div>
          );
        } else {
          return (
            <div>
              <button onClick={this.toggleVisibility}>Click Me</button>
            </div>
          );
        }
      }
    }; 
    `;

  const reactDomRender = `    
  ReactDOM.render(
      <MyComponent/>,
      document.getElementById('root')
    )`;

  const [jsx, setJsx] = useState(IntialCode);
  const [css, setCss] = useState(`body {\ncolor: white;\n} `);

  const [srcDoc, setSrcDoc] = useState("");
  const [theme, setTheme] = useState("material");
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const babelOutput = transform(jsx + reactDomRender, {
          presets: ["env", "react"],
        }).code;
        setSrcDoc(getSrcDoc({ babelOutput, error: null, css }));
      } catch (e) {}
    }, 250);
    return () => clearTimeout(timeout);
  }, [jsx, css]);

  return (
    <div className="new-code">
      
      <div className="mail-top">
        <div className="mail-logo">
          <div onClick={() => {history.push("/dashboard")}}>
          <i className="fas fa-home fa-2x"></i>
          </div>
          <div className="inbox-title">React-Pen</div>
          </div>
      </div>
      <div className="pane top-pane">
        <Editor
          language="jsx"
          displayName="jsx"
          value={jsx}
          onChange={setJsx}
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
