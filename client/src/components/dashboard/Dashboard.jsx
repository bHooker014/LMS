import React, { useEffect, useContext} from "react";
import AddStudent from './AddStudents';
import StudentsList from './StudentsList';
import SideNav from '../navStuff/SideNav';
import Calendar from '../Calendar/Calendar';
import Inbox from '../email/Inbox';
import TodaysAgenda from "../TodaysAgenda/TodaysAgenda";
import API from "../../utils/API";
import {MainContext} from "../context/MainContext"

const Dashboard = () => {  
  const State = useContext(MainContext);
  let useremail = State.instructor.instructor_email;
  
  useEffect(() => {
    API.getMessages(useremail).then((result) => {
      State.setMessages(result.data.emails );
    });
  }, [State.setMessages, useremail]);

  return (
    <div className='dashboad-main-container'>
    <SideNav />
     <AddStudent />
     <StudentsList />  
     <TodaysAgenda />  
     <Calendar /> 
     <Inbox />
 </div>
  );
};

export default Dashboard;
