import { useState, useContext } from "react";
import { toast } from "react-toastify";
import Calendar from "../Calendar/Calendar";
import { MainContext } from "../context/MainContext";
import API from "../../utils/API";

const DailyAgenda = () => {
  const State = useContext(MainContext);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const [agendaArr, setAgendaArr] = useState([]);


  const CreateAgenda = (e) => {
    e.preventDefault();
    agendaArr.push({ time: e.target[0].value, task: e.target[1].value });
    setTime("");
    setInput("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (State.datePicked !== "") {
      const body = { agenda: agendaArr, date: State.datePicked };
      API.createAgenda(body)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.success);
            setAgendaArr([]);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toast.warning("Please Pick a Date!");
    }
  };

  return (
    <div className="color2 fullvh92 main-agenda-maker-container ">
      <div className="agenda-maker-container ">
        <h1> Daily Agenda Maker</h1>
        <div>
          <form onSubmit={(e) => CreateAgenda(e)}>
            <div className="agenda-form-container">
              <input
                onChange={(e) => setTime(e.target.value)}
                value={time}
                placeholder="Enter Time"
                className="input-form-agenda"
              />
              <textarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Enter Task Here."
                className="input-form-agenda-textarea"
              />
              <button className="btn-agenda">
                Add Time and Task to Agenda
              </button>
            </div>
          </form>
          <button className="btn-agenda" onClick={(e) => onSubmit(e)}>
            Submit Agenda
          </button>
        </div>
        </div>
        <div className="agenda-display ">
          <div>
            <div className="border agenda-header-container">
              <h1 className="title">Agenda for {State.datePicked}</h1>
            </div>
            <div className="agenda-list">
            {agendaArr &&
              agendaArr.map((n, i) => (
                <div key={i} className="border time-block">
                  <pre className="border hour colorTime">{n.time}</pre>
                  <pre className="border hour-task color">{n.task}</pre>
                </div>
              ))}
              </div>
          </div>
        </div>
      
      <div className="calendar-wrapper">
        <Calendar />
      </div>
    </div>
  );
};

export default DailyAgenda;
