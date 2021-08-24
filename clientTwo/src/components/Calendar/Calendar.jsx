import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/Context";

import Header from './Header'
import buildCalendar from './build';
import dayStyles, { beforeToday } from './style';


function Rando() {
  const [calendar, setCalendar] = useState([])
  const State = useContext(StoreContext);
  const value = State.dayValue;
  const onChange = State.setDayValue;

  useEffect(() => {
  // State.setStudentDatePicked(new Date().format('LL').toString())

  // console.log(value)
    setCalendar(buildCalendar(value))
  }, [value])
  
  const dayClicker = (day) => {
    State.setStudentDatePicked(day.format('LL').toString())
  };

  return (
    <div className='calendar-main-container'>

      <Header value={value} setValue={onChange} />

     <div className='body'>
       <div className='day-names'>
     {
       ["S", "M", "T", "W", "T", "F", "S"].map((d,i) => <div key={i} className='week'>
      {d}
       </div>)
     }
       </div>
      {
        calendar.map((week, i) => <div key={week} className='week-container'>
          {
            week.map((day, i) => (<div key={i} className='day' onClick ={() => {!beforeToday(day) && onChange(day); dayClicker(day)}}>
                <div className={dayStyles(day, value)}>{day.format('D').toString()} </div>
            </div>))
          }
        </div> )
      }
      </div>
    </div>
  )
}

export default Rando

