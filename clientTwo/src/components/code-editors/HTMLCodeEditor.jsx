import React, { useState } from "react";

import { Controlled as CodeMirror } from "react-codemirror2";

require("codemirror/mode/xml/xml");
require("codemirror/mode/htmlmixed/htmlmixed.js");

const tests = [
  {
    text:
      "Your <code>blue-box</code> class should give the top of the elements <code>40px</code> of <code>padding</code>.",
    testString:
      'assert($(".blue-box").css("padding-top") === "40px", \'Your <code>blue-box</code> class should give the top of the elements <code>40px</code> of <code>padding</code>.\');',
  },
  {
    text:
      "Your <code>blue-box</code> class should give the right of the elements <code>20px</code> of <code>padding</code>.",
    testString:
      'assert($(".blue-box").css("padding-right") === "20px", \'Your <code>blue-box</code> class should give the right of the elements <code>20px</code> of <code>padding</code>.\');',
  },
  {
    text:
      "Your <code>blue-box</code> class should give the bottom of the elements <code>20px</code> of <code>padding</code>.",
    testString:
      'assert($(".blue-box").css("padding-bottom") === "20px", \'Your <code>blue-box</code> class should give the bottom of the elements <code>20px</code> of <code>padding</code>.\');',
  },
  {
    text:
      "Your <code>blue-box</code> class should give the left of the elements <code>40px</code> of <code>padding</code>.",
    testString:
      'assert($(".blue-box").css("padding-left") === "40px", \'Your <code>blue-box</code> class should give the left of the elements <code>40px</code> of <code>padding</code>.\');',
  },
];

export const HTMLCodeEditor = (props, ref) => {
  let defaultVal = `<h1>Stuff</h1>`;

  const [value, setValue] = useState(defaultVal);

  return (
    <div>
   
      <div
        className="description"
        style={{ color: "#c3c3f3", padding: "30px" }}
      ></div>
      <CodeMirror
        value={value}
        options={{
          mode: "htmlmixed",
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setValue(value);
        }}
        onChange={(editor, data, value) => {}}
      />

      <div className="output" dangerouslySetInnerHTML={{ __html: value }}></div>

      <button
        onClick={() => {
          console.log(document.querySelector(".output").childNodes);
        }}
      >
        test
      </button>
    </div>
  );
};
