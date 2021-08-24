import React, { useState, createContext, useEffect } from "react";
import moment from 'moment';

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  const [dayValue, setDayValue] = useState(moment());
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [err, setErr] = useState('');
  const [reportCards, setReportCards] = useState([]);
  const [studentDatePicked, setStudentDatePicked] = useState(dayValue.format('LL').toString());  
  const [videos, setVideos] = useState([])

  useEffect(() => {
    // loading spinner 
    setIsLoading(true);
 
  setTimeout(() => {
    setIsLoading(false)
  }, 1000)
}, []);


  return (
    <div>
      <StoreContext.Provider
        value={{
          user,
          setUser,
          dayValue,
          setDayValue,
          isOpen,
          setIsOpen,
          token,
          setToken,
          isLoading,
          setIsLoading,
          isAuthenticated,
          setIsAuthenticated,
          err,
          setErr,
          reportCards,
          setReportCards,
          studentDatePicked,
          setStudentDatePicked,
          videos,
          setVideos 
        }}
      >
        {props.children}
      </StoreContext.Provider>
    </div>
  );
};

