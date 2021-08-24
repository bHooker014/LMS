import React from "react";

function Dash() {
  return (
    <div className="dashboard">
      <div className="nav">
        <h1>Navbar</h1>
      </div>
      <div className="code">
        <h1>Code Editor</h1>
      </div>
      <div className="exercise">
        <h1>Daily Exercise</h1>
        <button href="/code-editor">Code-Editor</button>
      </div>
      <div className="message">
        <h1>Message Center</h1>
      </div>
      <div className="progress-bar">
        <h1>Progress Bar</h1>
      </div>
      <div className="footer">
        <h1>Footer</h1>
      </div>
    </div>
  );
}

export default Dash;
