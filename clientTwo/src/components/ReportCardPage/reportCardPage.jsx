import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/Context";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { ProgressBar } from "../navbar/progressBar";

export function ReportCards() {
  const State = useContext(StoreContext);
  let history = useHistory();
  const [reportCards, setReportCards] = useState([]);
  let [currentReport, setCurrentReport] = useState(null);
  let rating = currentReport ? currentReport.Rating : null;
  let pointsPossible = currentReport ? currentReport.points_possible : null;

  useEffect(() => {
    setReportCards(State.reportCards);
    setCurrentReport(State.reportCards[0]);
  }, [State.reportCards]);
  return (
    <div className="mailbox">
      <div className="mail-top">
        <div className="mail-logo">
          <div
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            <i className="fas fa-home fa-2x"></i>
          </div>
          <div className="inbox-title">Report Cards</div>
        </div>
      </div>
      <div className="mail-left">
        {reportCards &&
          reportCards.map((n) => (
            <div
              key={n.id}
              className="reportcard-page-card-container"
              onClick={() => setCurrentReport(n)}
            >
              <div className="instructor-card-info-container">
                <span className="instructor-card-info-span">
                  Instructor: {n.instructor_name}
                </span>
              </div>
              <div className="content-card-container">
                <p className="content-card-p">
                  <span style={{ fontStyle: "italic" }}>Report:</span> <br />
                  {n.report.slice(0, 15)}...
                </p>
              </div>
              <div className="date-stamp-report-card">
                {`${moment(n.created_at).format("LL")}`}
              </div>
            </div>
          ))}
      </div>

      <div className="mail-right">
        <div className="current-message">
          <div className="message-head">
            <span className="instructor-card-info-span">
              Instructor: {currentReport && currentReport.instructor_name}
            </span>
            <h3>
              {rating !== null
                ? `Grade: ${((rating / pointsPossible) * 100).toFixed(0)}%`
                : `No Report Cards At This Time`}
              {rating !== null ? (
                <ProgressBar
                  percent={
                    rating !== null
                      ? ((rating / pointsPossible) * 100).toFixed(0)
                      : null
                  }
                />
              ) : null}
            </h3>
            <div className="report-card-date">
              {`${moment(currentReport && currentReport.created_at).format(
                "LL"
              )}`}
            </div>
          </div>
          <div className="message-body">
            <pre className="content-card-p">
              <span style={{ fontStyle: "italic" }}>Student Report:</span>{" "}
              <br />
              {currentReport && currentReport.report}
            </pre>
            <span className="content-card-p">
              Points given: {currentReport && currentReport.Rating}
            </span>
            <br />
            <span className="content-card-p">
              Points possible: {currentReport && currentReport.points_possible}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
