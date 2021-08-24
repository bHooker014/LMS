import React, { useState, useEffect } from "react";
import { Editor } from "./editor";
import { useHistory } from "react-router-dom";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

export const D3CodePen = (props, ref) => {
 const history = useHistory();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState(`var myData = [12,43,24,67,74,85,45,17,84,6,4,76]


      var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 590 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;
      
      var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      
      
      var colors = d3.scaleLinear()
          .domain([0, myData.length])
          .range(['rgb(161, 228, 248)', 'rgb(202, 45, 241)'])
      
      
        var yScale = d3.scaleLinear()
          .domain([0, 100])
          .range([0, height]);
      
        var xScale = d3.scaleLinear()
          .domain([0, myData.length])
          .range([0, width - 10])
      
      
      svg.selectAll("rect")
          .data(myData)
          .enter()
          .append("rect")
          .attr('class', 'bar')
          .attr("x", (d,i) => xScale(i))
          .attr("y", d=> height- yScale(d))
          .attr("width", width / myData.length - 1)
          .attr("height", d=> yScale(d))
          .attr("fill", (d,i)=>colors(i))
      `);
  const [srcDoc, setSrcDoc] = useState("");
  const [theme, setTheme] = useState("material");

  const [tab, setTab] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
              <html>
      <head>
  <script src="./d3.min.js"></script>
      </head>
  <body>${html}</body>
  <style>${css}</style>
  <script>${js}</script>
  </html>
  `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);
  return (
    <div className="d3-pen">      
      <div className="d3-left-pane">
      <div className="code-editor-home-button"
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            <i className="fas fa-home fa-2x"></i>
          </div>

        <div className="tab-cont">
          <div className="button-back">
            <button
              className={tab === 1 ? "active-tab" : null}
              onClick={() => setTab(1)}
            >
              Html
            </button>
            <button
              className={tab === 2 ? "active-tab" : null}
              onClick={() => setTab(2)}
            >
              Css
            </button>
            <button
              className={tab === 3 ? "active-tab" : null}
              onClick={() => setTab(3)}
            >
              Javascript
            </button>
          </div>
        </div>

        <Editor
          language={tab === 1 ? "xml" : tab === 2 ? "css" : "javascript"}
          displayName={tab === 1 ? "html" : tab === 2 ? "css" : "javascript"}
          value={tab === 1 ? html : tab === 2 ? css : js}
          onChange={tab === 1 ? setHtml : tab === 2 ? setCss : setJs}
          theme={theme}
        />
      </div>
      <div className="d3-right-pane">
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
