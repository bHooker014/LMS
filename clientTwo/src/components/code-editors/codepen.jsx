import React, { useState } from "react";
import { Inspector, chromeDark, ObjectInspector } from "react-inspector";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useHistory } from "react-router-dom";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

export const CodePen = (props, ref) => {
  const history = useHistory();
  let defaultVal = `function convertToF(celsius) {
      let fahrenheit = celsius * 9/5 + 32;
      return fahrenheit;
      }  
        console.log(convertToF(30))`;

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

  const errorTheme = {
    ...chromeDark,
    ...{
      OBJECT_VALUE_STRING_COLOR: "rgb(233, 63, 59)",
      BASE_FONT_SIZE: "15px",
      TREENODE_FONT_SIZE: "15px",
      BASE_BACKGROUND_COLOR: "#263238",
    },
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
      logMultipleArguments: async function (args) {
        let currentLog = [];
        args.forEach((arg) => {
          currentLog += this.formatArgs(arg) + " ";
        });
        oldConsole.log.apply(oldConsole, arguments);
        consoleMessages.push({
          message: currentLog,
        });
        await setConsoleMessages([...consoleMessages]);
      },
      logSingleArgument: async function (logItem) {
        oldConsole.log(logItem);
        consoleMessages.push({
          message: this.formatArgs(logItem),
        });
        await setConsoleMessages([...consoleMessages]);
      },
      log: function (text) {
        let argsArr = Array.from(arguments);
        return argsArr.length !== 1
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
            type: "error",
          })
        );
      },
    };
  })(window.console);

  const runTests = (input) => {
    try {
      eval(value);
    } catch (e) {
      console.error(e);
    }
  };

  const clearMessages = () => {
    setConsoleMessages([]);
  };
  return (
    <div>
       <div className="mail-top">
        <div className="mail-logo">
          <div onClick={() => {history.push("/dashboard")}}>
          <i className="fas fa-home fa-2x"></i>
          </div>
          <div className="inbox-title">JavaScript-Pen</div>
          </div>
      </div>
    <div className="codepen-container">
      <div className="codepen-input">
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
      <div className="codepen-output">
        {consoleMessages.map((n) => {
          return n.type === "log" ? (
            <Inspector theme={theme} data={n.message} />
          ) : (
            <Inspector className="error" theme={errorTheme} data={n.message} />
          );
        })}
      </div>

      <div className="codepen-controls">
        <button className="code-btn codepen-run-btn" onClick={() => runTests()}>
          Run{" "}
        </button>

        <button
          className="code-btn codepen-clear-btn"
          onClick={() => clearMessages()}
        >
          clear
        </button>
      </div>
    </div>
    </div>
  );
};
