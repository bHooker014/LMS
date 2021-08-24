import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
import { MainContext } from "./context/MainContext";

const AddReportCard = ({ id }) => {
  const { setSelectedStudent, setReportCards } = useContext(MainContext);
  const [name, setName] = useState("");
  const [report, setReport] = useState("");
  const [rating, setRating] = useState("");
  const [pointsPossible, setPointsPossible] = useState("");
  const [teacher, setTeacher] = useState("");

  //gets insructors name
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      const parseData = await res.json();
      setTeacher(parseData);
      setName(parseData[0].instructor_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  //onsubmit handler
  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      StudentId: id,
      InstructorName: name,
      Report: report,
      Rating: rating,
      pointsPossible: pointsPossible,
    };
    API.addReportCard(body)
      .then((res) => {
        setReportCards(res.data.reportCards);
        setSelectedStudent(res.data);
      })
      .catch((err) => console.error(err.message));
    setReport("");
    setRating(1);
  };

  return (
    <div className="student-add-report-container">
      <form action="">
        <div className="student-add-report-inner-container">
          {teacher
            ? teacher.map((teacher, i) => (
                <div
                  key={i}
                  className="instructor-info-on-add-reportCard"
                >
                  <h4>Name: {teacher.instructor_name}</h4>{" "}
                  <h4> Email: {teacher.instructor_email}</h4>
                </div>
              ))
            : ""}

          <div className="form-containers-add-report">
            <label className="add_report_header" htmlFor="Report">
              Add Report
            </label>
            <textarea
              value={report}
              onChange={(e) => setReport(e.target.value)}
              id="Report"
              className="reportCard-textArea"
            ></textarea>
          </div>
          <div className="form-containers-add-report-bottom">
            <div>
              <label className="add_report_header" htmlFor="rating">
                Points Given
              </label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                id="rating"
                className="custom-select"
              ></input>
              <br />
              <label className="add_report_header" htmlFor="rating">
                Points Possible
              </label>
              <input
                type="number"
                value={pointsPossible}
                onChange={(e) => setPointsPossible(e.target.value)}
                id="pointsPossible"
                className="custom-select"
              ></input>
            </div>
            <button onClick={onSubmit} className="add-rating-btn">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="teacher-logo-wrapper">
      <img className="teacher-side-logo2" src="../logo2.png" alt="logo"></img>
      <img className="teacher-side-logo3" src="../logo2.png" alt="logo"></img>
      <img className="teacher-side-logo4" src="../logo2.png" alt="logo"></img>
      </div>
    </div>
  );
};

export default AddReportCard;
