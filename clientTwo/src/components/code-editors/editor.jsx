import React, { useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css");

export function Editor(props) {
  const { language, displayName, value, onChange, theme } = props;
  const [open, setOpen] = useState(true);
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
       
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          {open ? <Compress /> : <Expand />}
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: theme,
          lineNumbers: true,
        }}
      />
    </div>
  );
}

const Compress = () => (
  <div>
    {" "}
    <i className="fa fa-compress-alt"></i>
  </div>
);
const Expand = () => (
  <div>
    {" "}
    <i className="fa fa-expand-alt"></i>
  </div>
);
