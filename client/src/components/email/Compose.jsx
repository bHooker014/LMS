import React, { useState, useRef, useContext } from "react";
import Modal from "../modal/Modal";
import Attachment from "./Attachment";
import API from "../../utils/API";
import { MainContext } from "../context/MainContext";
import { toast } from "react-toastify";

// *************************************************************************
// ***********************   INSTRUCTOR SIDE  ******************************
// *************************************************************************

function Compose(props) {
  const studentEmail = props.location.state;
  const ModalRef = useRef();
  const State = useContext(MainContext);

  const [message, setMessage] = useState({
    senderEmail: State.instructor.instructor_email,
    recieverEmail: studentEmail,
    subject: "",
    body: "",
    file: null,
  });

  const onChange = (e) => {
    // setting a variable and creating a new msgObj from the original
    // message in local state
    let messageObj = {
      ...message,
    };
    // Setting the key value pairs with thier
    // respective target names and values
    messageObj[e.target.name] = e.target.value;
    // Setting the state of the message with the msg Obj
    setMessage(messageObj);
  };
  // The onSubmit handle checks to see if there is a file attached
  // to decide on which API call to make as well as setting the header
  // and appending the file that was selected.
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", message.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    // Checking if there is a file
    if (message.file !== null) {
      // function call with attachment
      attemptSendWithAtt(formData, config, message);
      // Setting the message obj back to its original state
      setMessage({
        senderEmail: message.senderEmail,
        recieverEmail: studentEmail,
        subject: "",
        body: "",
        file: null,
      });
      // Pushing the user back to the dashboard
      // once the email has been sent
      props.history.push("/dashboard");
      toast.success("Message has been sent");
    } else {
      // API call with out attachment
      API.sendMessage(message).then(props.history.push("/dashboard"));
      toast.success("Message has been sent");
    }
  };

  const attemptSendWithAtt = (formD, config, message) => {
    // API call with attachment
    API.sendMessageWithAtt(formD, config, message)
      .then(props.history.push("/inbox"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="compose-page">
      <div className="compose-container">
        <form className="email-form" onSubmit={onSubmit}>
          <input
            className="inputCompose"
            // The defualt value of the reciever email
            value={message.recieverEmail}
            list="students"
            placeholder="to"
            name="recieverEmail"
            // Will change the default value of the reciever email from the drop down
            // which will effect the over all value of the input
            onChange={onChange}
          ></input>
          <datalist id="students">
            {/* Mapping thru the students contained in the mainContext for the option drop down  */}
            {State.students.map((n, i) => {
              return (
                <option value={n.student_email} key={i}>
                  {n.first_name} {n.last_name}
                </option>
              );
            })}
          </datalist>
          <input
            className="inputCompose"
            type="text"
            name="subject"
            id="subject"
            placeholder="subject"
            onChange={onChange}
          ></input>
          <div className="attachment-bar mt-5 w-100">
            <div className="attachment-selector"></div>
            <div
              onClick={() => ModalRef.current.openModal()}
              className="att-btn"
            >
              Attachment
            </div>
            <Modal ref={ModalRef}>
              <Attachment message={message} setMessage={setMessage} />
            </Modal>
            <div className="btn-box"></div>
          </div>

          <textarea
            className="email-body mt-5 w-100"
            type="text-area"
            name="body"
            id="body"
            onChange={onChange}
          />
          <button className="send-btn mt-5" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Compose;
