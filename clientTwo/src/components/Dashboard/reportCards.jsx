import React, { useContext } from "react";
import StarRating from "./StarRating";
import { StoreContext } from "../context/Context";
import moment from "moment";
import { useHistory } from "react-router-dom";

const ReportCards = () => {
  const State = useContext(StoreContext);
  let history = useHistory();
  return (
   
      <div className="inner-container-for-report-cards" onClick={() => history.push('/reportCards')}>
      <h4 className="reportCardHead">Report Cards</h4>
        {State.reportCards &&
          State.reportCards.reverse().map((n, i) => (
            <div key={n.id} className="card-main-container">
              <div className="instructor-card-info-container">
                <span className="instructor-card-info-span">
                  Instructor: <br /> {n.instructor_name}
                </span>
              </div>
              <div className="content-card-container">
                <p className="content-card-p">
                  <span style={{ fontStyle: "italic" }}>Student Report:</span>{" "}
                  <br />
                  {n.report.slice(0, 80)}...
                </p>
                <span className="content-card-p">Points given: {n.Rating}</span>
                <br />
                <span className="content-card-p">Points possible: {n.points_possible}</span>
              </div>
              <div className="star-container-for-reportCard">
                <span>
                  <h4>
                    {
                      <StarRating
                        rating={(n.Rating / n.points_possible) * 10}
                      />
                    }{" "}
                    ({((n.Rating / n.points_possible) * 100).toFixed(0)}%)
                  </h4>
                </span>
                <br />
              </div>
              <div className="date-stamp-report-card">
                {`${moment(n.created_at).format("LL")}`}
              </div>
            </div>
          ))}
      </div>
   
  );
};

export default ReportCards;
