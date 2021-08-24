import React, { useState, useEffect, useContext } from "react";
import {MainContext} from "../context/MainContext";
import Header from './Header'
import buildCalendar from './build';
import dayStyles, { beforeToday } from './style';


function Rando() {
  const [calendar, setCalendar] = useState([])
  const State = useContext(MainContext);
  const value = State.dayValue;
  const onChange = State.setDayValue;

useEffect(() => {
setCalendar(buildCalendar(value))
}, [value])

const dayClicker = (day) => {
  State.setDatePicked(day.format('LL').toString())
};

  return (
    <div>
    <div className='calendar-main-container'>
     <div className='body'>
      <Header value={value} setValue={onChange} />

  
       <div className='day-names'>
     {
       ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className='week'>
      {d}
       </div>)
     }
       </div>
      {
        calendar.map((week, i) => <div key={i} className='week-container'>
          {
            week.map((day, i) => (<div key={i} className='day' onClick ={() => {!beforeToday(day) && onChange(day); dayClicker(day)}}>
                <div className={dayStyles(day, value)}>{day.format('D').toString()}</div>
            </div>))
          }
        </div> )
      }
      </div>
    </div>
    </div>
  )
}

export default Rando
