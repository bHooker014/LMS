import React, { useState, createContext } from "react";
import moment from 'moment';
export const MainContext = createContext();

export const MainContextProvider = (props) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [reportCards, setReportCards] = useState("");
  const [instructor, setInstructor] = useState({});
  const [instructors, setInstructors] = useState([]);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [dayValue, setDayValue] = useState(moment())
  const [datePicked, setDatePicked] = useState(dayValue.format('LL').toString());
  const [messages, setMessages] = useState([]);
  const [videos, setVideos] = useState([])
 

  return (
    <MainContext.Provider
      value={{
        students,
        dayValue,
        setDayValue,
        instructors, 
        setInstructors,
        setStudents,
        selectedStudent,
        setSelectedStudent,
        reportCards,
        setReportCards,
        instructor,
        setInstructor,
        currentEmail,
        setCurrentEmail,
        datePicked,
        setDatePicked,
        messages, 
        setMessages,
        videos,
        setVideos
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
