import React, { useState, useEffect, useContext } from "react";
import FileSaver from "file-saver";
import {toast} from 'react-toastify';

import API from "../../utils/API";
import { StoreContext } from "../context/Context"; 
import { useHistory } from "react-router-dom";

export function Mailbox(props) {
  const State = useContext(StoreContext);
  let history = useHistory();
  const [Messages, setMessages] = useState({ Messages: [] });
  const email = Messages.Messages;
  let useremail = State.user.student_email;

  let [currentMessage, setCurrentMessage] = useState(null);


  // When the page renders the use effect is setting the results
  // of the api call to the local state of messages for the purpose
  // of mapping thru and rendering the emails in a table via the
  // message array as a local state.
  useEffect(() => {
    API.getMessages(useremail).then((result) => {
      setMessages({ Messages: result.data.emails });
      setCurrentMessage(result.data.emails[0]);
    }).catch(err => console.log(err))
  }, [State.instructor]);
  // simple function for buttons to navigate to other components
  // and if nessissary pass something thru props
  const onClickNav = (path, prop) => {
    history.push(path, prop);
  };

  const download = (file, type) => {
    API.downloadFile(file).then((response) => {
      FileSaver.saveAs(response.data, type);
    })
    .catch(err => console.log(err))
  };
  const deleteEmail = (ref, id) => {
    API.deleteEmail(ref, id)
    .then()
    .catch(err => console.log(err))
     onClickNav('/dashboard');
    //  this toast is for a successful deletion and i know its in the catch!
     toast.success('Email deleted');
  };

  const itemRow = email.map((n, i) => (
    <Email key={i} email={n} setCurrentMessage={setCurrentMessage} />
  ));
  return (
    <div className="mailbox">
      <div className="mail-top">
        <div className="mail-logo">
          <div onClick={() => {history.push("/dashboard")}}>
          <i className="fas fa-home fa-2x"></i>
          </div>
          <div className="inbox-title">Inbox</div>
        </div>
        <div
          className="compose"
          onClick={() => {
            history.push("/compose");
          }}
        >
          {" "}
          <div>Compose </div>
          <i className="fas fa-envelope fa-2x"></i>
        </div>
      </div>
      <div className="mail-left">{itemRow}</div>

      <div className="mail-right">
        {currentMessage && (
          <div className="current-message">
            <div className="message-head">
              <div>
                <div className="fromField">
                  From: {currentMessage.sender_email}
                </div>
                <div className="time">
                  {new Date(currentMessage.created_at).toDateString()}
                </div>
              </div>
              <div className="message-head-icons">
                <div
                  onClick={() =>
                    onClickNav("/compose", currentMessage.sender_email)
                  }
                >
                  <i className="fas fa-reply"></i>
                </div>

                <div
                  onClick={() => {
                    deleteEmail(
                      currentMessage.attachment_ref,
                      currentMessage.id
                    );
                  }}
                >
                  <i className="fas fa-trash-alt"></i>
                </div>
              </div>
              <div>
                {currentMessage.attachment_ref ? (
                  <div
                    onClick={() =>
                      download(
                        currentMessage.attachment_ref,
                        currentMessage.content_type
                      )
                    }
                  >
                   <i className="fa fa-download"></i>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="message-body"><pre>{currentMessage.body}</pre></div>
          </div>
        )}
      </div>
    </div>
  );
}

const Email = (props) => {
  let { email } = props;
  return (
    <div className="email" onClick={() => props.setCurrentMessage(email)}>
      <div className="email_letter">
        <div className='letter'>{email.sender_email.slice(0, 1).toUpperCase()}</div>
      </div>
      <div className="email_details">
        <h3 className="email_sender">{email.sender_email}</h3>
        <h4 className="email_subject">
          {createSubjectPreview(email.email_subject)}
        </h4>
        <p className="email_body">{createPreview(email.body)}</p>
      </div>
    </div>
  );
};

function createPreview(str) {
  if (str.length > 80) {
    return str.slice(0, 80) + "...";
  }
  return str;
}

function createSubjectPreview(str) {
  if (str.length > 20) {
    return str.slice(0, 20) + "...";
  }
  return str;
}
