import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import { MainContext } from "./context/MainContext";
import StarRating from "./dashboard/StarRating";
import ReportCards from "./ReportCards";
import AddReportCard from "./AddReportCard";

const StudentDetailPage = () => {
  const { id } = useParams();
  const { selectedStudent, setSelectedStudent, setReportCards } = useContext(
    MainContext
  );

  useEffect(() => {
    const getAStu = async () =>
      await API.getAStudent(id)
        .then((res) => {
          setSelectedStudent(res.data);
          setReportCards(res.data.reportCards);
        })
        .catch((err) => console.error(err.message));
    getAStu();
  }, [id, setSelectedStudent]);

  return (
    <div className="overall-container-for-student-page">
      <div className="studentInfo-container">
        <div className="title-for-all-reports">
          <h3>
            {selectedStudent && selectedStudent.student.first_name}'s Reports
          </h3>
        </div>
        <div className="container-for-info-students-and-stars">
          <h3 className="">
            {selectedStudent && selectedStudent.student.first_name}{" "}
            {selectedStudent && selectedStudent.student.last_name}{" "}
            {selectedStudent && selectedStudent.student.ref_number}{" "}
          </h3>

          <h3 className="">
            {selectedStudent && (
              <StarRating rating={selectedStudent.student.Score} />
            )}{" "}
            (
            {selectedStudent.student &&
              (selectedStudent.student.Score * 10).toFixed(0)}
            %)
          </h3>
        </div>
      </div>
      {selectedStudent && (
        <>
          <AddReportCard id={id} />
          <div className="report-card-main-container">
            <ReportCards />
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDetailPage;
