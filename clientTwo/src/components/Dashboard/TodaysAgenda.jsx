import {useState, useEffect, useContext} from "react";
import { StoreContext } from "../context/Context";
import API from "../../utils/API"

function TodaysAgenda() {

  const State  = useContext(StoreContext);
  const [agArr, setAgArr] = useState([{time: 'Hello', agenda: "Welcome to Persevere's Student Portal ."}])


useEffect(() => {
  API.getAgenda(State.studentDatePicked)
  .then(res => {
    if(res.data.agenda.length > 0){ 
     setAgArr(res.data.agenda)
    } else {
      setAgArr([{time: "", agenda: "No agenda. Pick another date."}])
    } 
    
  })
  .catch(err => {
    console.log(err)})
},[State.studentDatePicked])


  return (
    <div className="todays-agenda-container">

    <div className="header-container">
      <div className="title">Agenda</div>
      <div className="date">{State.studentDatePicked}</div>
    </div>
    <div className="scroll-behavior-agenda">
    {
      agArr && agArr.map((n, i) => (
     
    <div key={i} className="time-block">
      <pre className="hour colorTime">{n.time}</pre>
      <pre className={ i % 2 === 0 ? "hour-task color" : "hour-task color1"}>{n.agenda}</pre>
   </div>
    ))
    }
    </div>
 </div>
  );
}

export default TodaysAgenda;

