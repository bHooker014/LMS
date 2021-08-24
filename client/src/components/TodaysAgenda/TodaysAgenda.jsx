import { useState, useEffect, useContext } from "react";
import { MainContext } from "../context/MainContext";
import API from "../../utils/API";

function TodaysAgenda() {
  const State = useContext(MainContext);
  const [agArr, setAgArr] = useState([]);


  useEffect(() => {

    API.getAgenda(State.datePicked)
      .then((res) => {
        if (res.data.agenda.length > 0) {
          setAgArr(res.data.agenda);
        } else {
          setAgArr([{time: "", agenda: `${State.instructor.instructor_name ? State.instructor.instructor_name : "Instructor"}, there is no agenda for that date. Either make an agenda or pick another date.`}]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [State.datePicked]);

  return (
    <div className=" todays-agenda-container">
      <div className=" header-container">
        <div className="title">Agenda</div>
        <div className="date">{State.datePicked}</div>
      </div>
      <div className="scroll-behavior-agenda">
      {agArr &&
        agArr.map((n, i) => (
          <div key={i} className=" time-block">
            <pre className=" hour colorTime">{n.time}</pre>
            <pre
              className={i % 2 === 0 ? "hour-task color" : "hour-task color1"}
            >
              {n.agenda}
            </pre>
          </div>
        ))}
        </div>
    </div>
  );
}

export default TodaysAgenda;
