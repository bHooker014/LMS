import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { StoreContext } from "../context/Context";
import {useHistory} from 'react-router-dom'


function Inbox(props) {
  const State = useContext(StoreContext);
  let history = useHistory()


  
  const [Messages, setMessages] = useState({ Messages: [] });
  const email = Messages.Messages;
  // let useremail = State.user != null ? State.user[0].student_email: ''
  let useremail = State.user  ? State.user.student_email: ''


  // When the page renders the use effect is setting the results
  // of the api call to the local state of messages for the purpose
  // of mapping thru and rendering the emails in a table via the
  // message array as a local state.
  useEffect(() => {
    API.getMessages(useremail).then((result) => {
      setMessages({ Messages: result.data.emails });
    });
  }, [State.user, useremail]);
// simple function for buttons to navigate to other components 
  // and if nessissary pass something thru props



  const itemRow = email.map((n, i) => (
    <Email key={i} email={n}/>
  ));

  if(State.user){

  return (
    <div className='messages'>
      <div className="email-table-container" onClick={()=> history.push('/inbox')}> 
        {itemRow}
        
      </div>
    </div>
  );}
  else{
    return (<div>loading...</div>)
  }
}

export default Inbox;



const Email = (props) => {

let{ email } = props
  return(
    <div className='email'>
      <div className='email_letter'><div className='letter'>{email.sender_email.slice(0,1).toUpperCase()}</div></div>
      <div className="email_details">
<h3 className='email_sender'>{email.sender_email}</h3>
<h4 className='email_subject'>{email.email_subject}</h4>
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