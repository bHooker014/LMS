import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";
import moment from 'moment';
import { useHistory } from "react-router-dom";

// *************************************************************************
// ***********************   INSTRUCTOR SIDE  ******************************
// *************************************************************************


function Inbox() {
  const State = useContext(MainContext);
  const email = State.messages;
  const history = useHistory();
  // simple function for buttons to navigate to other components
  // and if nessissary pass something thru props

  const itemRow = email.map((n, i) => (
    <Email  key={i} email={n} />
  
  ));
  return (
      <div className="email-table-container" onClick={() => history.push("/mailbox")}>
      <h4 className='emailhead'>Message Center</h4>
      {itemRow.reverse()}
      </div> 
  );
}

export default Inbox;

const Email = (props) => {

  let{ email } = props
  
    return(
      <div className='email'>
        <div className='email_contianer_left'>
        <span className='email_date'>{`${moment(email.created_at).format('LL')}`}</span>
        <div className='email_letter'><div className='letter'>{email.sender_email.slice(0,1).toUpperCase()}</div> 
        </div>
        </div>
        <div className="email_details">
  <h4 className='email_sender'>Email: {email.sender_email}</h4>
  <h5 className='email_subject'> Subject: {email.email_subject}</h5>
  <p className='email_body'>{createPreview(email.body)}</p>
     </div> 
     </div>
    )
  }
  
  
  
  
  function createPreview(str){
    if(str.length > 100){
      return str.slice(0, 25) + '...'
    }
  return str
  }