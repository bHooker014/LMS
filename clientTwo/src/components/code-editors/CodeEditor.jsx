import React, { useState } from "react";
import { Inspector } from "react-inspector";
import { toast } from  "react-toastify";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useHistory } from "react-router-dom";
let esprima = require("esprima/dist/esprima");
let escodegen = require("escodegen/escodegen");
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

export const CodeEditor = (props, ref) => {
  let defaultVal = props.challenge.editorValue;
 const history = useHistory();
  const [value, setValue] = useState(defaultVal);
  const [consoleMessages, setConsoleMessages] = useState([]);

  const theme = {
    BASE_FONT_FAMILY: "Menlo, monospace",
    BASE_FONT_SIZE: "16px",
    BASE_LINE_HEIGHT: 1.2,

    BASE_BACKGROUND_COLOR: "#263238",
    BASE_COLOR: "rgb(213, 213, 213)",

    OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
    OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
    OBJECT_NAME_COLOR: "rgb(227, 110, 236)",
    OBJECT_VALUE_NULL_COLOR: "rgb(127, 127, 127)",
    OBJECT_VALUE_UNDEFINED_COLOR: "rgb(127, 127, 127)",
    OBJECT_VALUE_REGEXP_COLOR: "rgb(233, 63, 59)",
    OBJECT_VALUE_STRING_COLOR: "rgb(233, 63, 59)",
    OBJECT_VALUE_SYMBOL_COLOR: "rgb(233, 63, 59)",
    OBJECT_VALUE_NUMBER_COLOR: "hsl(252, 100%, 75%)",
    OBJECT_VALUE_BOOLEAN_COLOR: "hsl(252, 100%, 75%)",
    OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(85, 106, 242)",

    HTML_TAG_COLOR: "rgb(93, 176, 215)",
    HTML_TAGNAME_COLOR: "rgb(93, 176, 215)",
    HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
    HTML_ATTRIBUTE_NAME_COLOR: "rgb(155, 187, 220)",
    HTML_ATTRIBUTE_VALUE_COLOR: "rgb(242, 151, 102)",
    HTML_COMMENT_COLOR: "rgb(137, 137, 137)",
    HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",

    ARROW_COLOR: "rgb(145, 145, 145)",
    ARROW_MARGIN_RIGHT: 3,
    ARROW_FONT_SIZE: 12,
    ARROW_ANIMATION_DURATION: "0",

    TREENODE_FONT_FAMILY: "Menlo, monospace",
    TREENODE_FONT_SIZE: "13px",
    TREENODE_LINE_HEIGHT: 1.2,
    TREENODE_PADDING_LEFT: 12,

    TABLE_BORDER_COLOR: "rgb(85, 85, 85)",
    TABLE_TH_BACKGROUND_COLOR: "rgb(44, 44, 44)",
    TABLE_TH_HOVER_COLOR: "rgb(48, 48, 48)",
    TABLE_SORT_ICON_COLOR: "black", //'rgb(48, 57, 66)',
    TABLE_DATA_BACKGROUND_IMAGE:
      "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))",
    TABLE_DATA_BACKGROUND_SIZE: "128px 32px",
  };

  const console = (function (oldConsole) {
    return {
      formatArgs: function (arg) {
        let outputArgsMsg;
        switch (this.getType(arg)) {
          case "string":
            outputArgsMsg = `${arg}`;
            break;
          case "object":
            outputArgsMsg = arg;
            break;
          case "array":
            outputArgsMsg = arg;
            break;
          default:
            outputArgsMsg = arg;
            break;
        }

        return outputArgsMsg;
      },
      getType: function (arg) {
        if (typeof arg === "string") return "string";
        if (typeof arg === "boolean") return "boolean";
        if (typeof arg === "function") return "function";
        if (typeof arg === "number") return "number";
        if (typeof arg === "undefined") return "undefined";
        if (typeof arg === "object" && !Array.isArray(arg)) return "object";
        if (typeof arg === "object" && Array.isArray(arg)) return "array";
      },
      logSingleArgument: async function (logItem) {
        oldConsole.log(logItem);
        oldConsole.log(consoleMessages);
        consoleMessages.push({
          message: this.formatArgs(logItem),
        });
        await setConsoleMessages([...consoleMessages]);
      },
      log: function (text) {
        let argsArr = Array.from(arguments);
        return argsArr.length != 1
          ? this.logMultipleArguments(argsArr)
          : this.logSingleArgument(text);
      },
      info: function (text) {
        oldConsole.info(text);
      },
      warn: function (text) {
        oldConsole.warn(text);
      },
      error: function (err) {
        oldConsole.error(err);
        setConsoleMessages(
          [...consoleMessages].concat({
            message: `${err.name}: ${err.message}`,
          })
        );
      },
    };
  })(window.console);

  const preTest = () => {
    if (value == "") {
      return toast.success("Code something!")
    } else {
      runTests(value);
    }
  };
  const runTests = async (input) => {
    clearConsole();
    let newInput = esprima.parse(value, {
      tolerant: true,
    });

    props.challenge.tests.forEach((test) => {
      let parsedInput = { ...newInput };

      let newCall = esprima.parse(test.test, {
        tolerant: true,
      });

      parsedInput.body = [parsedInput.body[0], newCall.body[0]];
      let newfunc = escodegen.generate(parsedInput);

      let result = "";
      try {
        result = eval(newfunc);
        console.log(result);
      } catch (err) {
        console.error(err);
      }

      if (result === test.expected) {
        test.pass = true;
      } else {
        test.pass = false;
      }
    });
  };

  const clearConsole = () => setConsoleMessages([]);

  return (
    <div className="code-challenge-container">
      <div className="left-side">
      <div className="code-editor-home-button"
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            <i className="fas fa-home fa-2x"></i>
          </div>
        <div className="description">
          <h3>{props.challenge.title}</h3>
          <p>{props.challenge.description}</p>
        </div>

        <div className="tests">
          {props.challenge.tests.map((t, i) => {
            return (
              <div className="test-items" key={i}>
                {t.pass === "start" ? <Start /> : t.pass ? <Check /> : <Fail />}

                <div>
                  <span className="functionCall">{t.test}</span> should return{" "}
                  <span>{t.expected}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="right-side">
        <div className="editor-input">
          <CodeMirror
            value={value}
            options={{
              mode: "javascript",
              theme: "material",
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setValue(value);
            }}
            onChange={(editor, data, value) => {}}
          />
        </div>

        <div className="editor-controls">
          <button onClick={() => preTest()}>Run </button>
          <button onClick={() => clearConsole()}>Clear</button>
        </div>

        <div className="editor-output">
          {consoleMessages.map((n) => (
            <Inspector theme={theme} data={n.message} />
          ))}
        </div>
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
