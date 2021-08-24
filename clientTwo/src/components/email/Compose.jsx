import React, { useState, useRef, useContext, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { Modal } from "../Modals/Modal";
import Attachment from "./Attachment";
import API from "../../utils/API";
import { StoreContext } from "../context/Context";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function Compose(props) {
  let history = useHistory();
  const instructorEmail = props.location.state;
  const ModalRef = useRef();
  const State = useContext(StoreContext);
  const [staff, setStaff] = useState([]);
  const [message, setMessage] = useState({
    senderEmail: State.user.student_email,
    recieverEmail: instructorEmail,
    subject: "",
    body: "",
    file: null,
  });

  // simple function for buttons to navigate to other components
  // and if nessissary pass something thru props
  const onClickNav = (path, prop) => {
    history.push(path, prop);
  };
  // Getting all of the instrutors and setting the local state
  // of staff to the results. The results are only the Instructor
  // names and emails.
  useEffect(() => {
    API.getInstructors().then((result) => {
      setStaff(result.data.instructors);
    });
  }, []);

  const onChange = (e) => {
    // setting a variable and creating a new msgObj from the original
    // message in local state
    let messageObj = {
      ...message,
      senderEmail: State.user.student_email,
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
      attemptSendWithAtt(formData, config, message);
      // Setting the message obj back to its original state
      setMessage({
        // senderEmail: "",
        // staff: "",
        subject: "",
        body: "",
        file: null,
      });
      // Pushing the user back to the inbox
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
      <div className="mail-top">
        <div className="mail-logo">
          <div
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            <i className="fas fa-home fa-2x"></i>
          </div>
          <div className="inbox-title">Compose</div>
        </div>
        <div
          className="compose"
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          {" "}
          <div>Send </div>
          <i className="fas fa-paper-plane fa-2x"></i>
        </div>
      </div>
      {/* <Navbar /> */}
      <div className="compose-container">
        <form className="email-form" onSubmit={onSubmit}>
          <div className="compose-head">
            <input
              className="to-input mt-5 w-100"
              // The defualt value of the reciever email
              value={message.recieverEmail}
              list="staff"
              placeholder="to"
              name="recieverEmail"
              // Will change the default value of the reciever email from the drop down
              // which will effect the over all value of the input
              onChange={onChange}
              required
            />
            <datalist id="staff">
              {/* Mapping thru the Instructors contained in the local state of staff for the option drop down  */}
              {staff.map((n, i) => (
                <option value={n.instructor_email} key={i}>
                  {n.instructor_name}
                </option>
              ))}
            </datalist>
            <input
              className="subject-input mt-5 w-100"
              type="text"
              name="subject"
              id="subject"
              placeholder="subject"
              onChange={onChange}
            ></input>
          </div>

          <div className="compose-body">
            <div className="attachment-bar mt-5 w-100">
              <div className="attachment-list"></div>
              <div
                onClick={() => ModalRef.current.openModal()}
                className="att-btn"
              >
                <i className="fas fa-paperclip fa-1x"></i>
              </div>
              <Modal ref={ModalRef}>
                <Attachment message={message} setMessage={setMessage} />
              </Modal>
            </div>
            <textarea
              className="email-body mt-5 w-100"
              type="text-area"
              name="body"
              id="body"
              onChange={onChange}
            />
            <button className="inbox-btn " type="submit">
              Send
            </button>
            <button
              className="inbox-btn "
              onClick={() => onClickNav("/inbox")}
            >
              INBOX
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Compose;
