import React, { useEffect, useContext, useRef, useState } from "react";
import API from "../../utils/API";
import { MainContext } from "../context/MainContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";
import Modal from "../modal/Modal";
import { toast } from "react-toastify";
import DeleteModal from "../modal/DeleteModal/DeleteModal";

const StudentsList = (props) => {
  const { students, setStudents } = useContext(MainContext);
  let history = useHistory();
  const modalRef = useRef();
  const deleteModalRef = useRef();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [RefNumber, setRefNumber] = useState("");
  const [Grade, setGrade] = useState("");
  const [IsActive, setIsActive] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [bunkSpace, setBunkSpace] = useState("");
  const [coThree, setCoThree] = useState("");

 
  useEffect(() => {
    API.getStudents()
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => console.error(err.message));
      //gets student info for update model 
      const getAStu = async () =>
      await API.getAStudent(currentId)
        .then((res) => {
          setFirstName(res.data.student.first_name);
          setLastName(res.data.student.last_name);
          setRefNumber(res.data.student.ref_number);
          setGrade(res.data.student.grade);
          setIsActive(res.data.student.is_active);
          setBunkSpace(res.data.student.bunk_space);
          setCoThree(res.data.student.co_three);
        })
        .catch((err) => console.error(err.message));
    
      if(currentId !== ""){
        getAStu();
      };
  }, [setStudents, currentId]);


// simple function for buttons to navigate to other components
  // and if nessissary pass something thru props
  const onClickNav = (path, prop) => {
    history.push(path, prop);
  };

  // Delete Modal
  const handleDelete = async (e, id) => {
    e.preventDefault();
    API.deleteStudent(id)
      .then((res) => {
        //  deletes emails written by student
        if (res.data.arrOfEmails.length > 0) {
          res.data.arrOfEmails.map((obj) => {
            API.deleteEmail(obj.ref, obj.id)
              .then()
              .catch((err) => console.log(err));
          });
        }
        history.push("/");
        toast.success(
          `${FirstName} ${LastName} ${RefNumber} student has been deleted`
        );
      })
      .catch((err) => console.error(err.message));
    history.push("/");
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    setCurrentId(id);
    modalRef.current.openModal();
  };

  const deleteUserModal = (e, id) => {
    e.stopPropagation();
    deleteModalRef.current.openModal();
  };

  const handleStudentSelect = (id) => {
    history.push(`/student/${id}`);
  };

  const renderRating = (data) => {
    if (!data.ScoreCount) {
      return <span className="text-warning">0 Reports</span>;
    }
    return (
      <>
        <StarRating className="stars-yo" rating={data.Score} />
        <span className="text-warning ml-1">({data.ScoreCount})</span>
      </>
    );
  };

  //submit handler
  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      FirstName,
      LastName,
      RefNumber,
      Grade,
      IsActive,
      bunkSpace,
      coThree,
    };

    API.updateStudent(currentId, body)
      .then((res) => {
        toast.success(`students' info has been update`);
      })
      .catch((err) => console.error(err.message));
    history.push("/");
  };

  return (
    <div className="studentfinder-main-container">
      <table className="table-for-active-students">
        <thead>
          <tr className="student-keys-for-class">
            <th>Student</th>
            <th>DOC Number</th>
            <th>Assigned CO III</th>
            <th>Bunk Space</th>
            <th>isActive</th>
            <th>Report Cards</th>
            <th>Edit</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className="student-map-keys-container">
          {students &&
            students.map((n) => (
              <tr className="student-map-keys" key={n.id}>
                <td className="keys-holder">{`${n.first_name} ${n.last_name}`}</td>
                <td className="keys-holder">{n.ref_number}</td>
                <td className="keys-holder">{n.co_three}</td>
                <td className="keys-holder">{n.bunk_space}</td>
                <td className="keys-holder">
                  {n.is_active ? "active" : "inactive"}
                </td>
                <td className="keys-holder">
                  {renderRating(n)}{" "}
                  <button
                    className="rate-btn"
                    onClick={() => handleStudentSelect(n.id)}
                  >
                    Rate
                  </button>
                </td>
                <td className="keys-holder">
                  <button
                    className="edit-student-btn"
                    onClick={(e) => handleUpdate(e, n.id)}
                  >
                    Edit Student
                  </button>
                </td>
                <td className="keys-holder">
                  <button
                    onClick={() => onClickNav("/email", n.student_email)}
                    className="email-student-btn"
                  >
                    Email Student
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal ref={modalRef}>
        <div className="edit-student-main-modal-container">
          <h2 className="header-edit-modal">
            Student Update{" "}
            <button onClick={deleteUserModal} className="delete-button-student">
              Delete
            </button>
          </h2>
          <form action="POST">
            <div className="form-editStudent-modal-container">
              <label htmlFor="first_name">First Name</label>
              <input
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="FirstName"
                className="input-style-editStudent"
                name="FirstName"
              />
            </div>
            <div className="form-editStudent-modal-container">
              <label htmlFor="last_name">Last Name</label>
              <input
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                id="LastName"
                className="input-style-editStudent"
                name="LastName"
              />
            </div>
            <div className="form-editStudent-modal-container">
              <label htmlFor="RefNumber">Student Number/Password</label>
              <input
                value={RefNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                type="text"
                id="RefNumber"
                className="input-style-editStudent"
                name="RefNumber"
              />
            </div>
            <div className="form-editStudent-modal-container">
              <label htmlFor="grade">Over All Grade</label>
              <input
                value={Grade}
                onChange={(e) => setGrade(e.target.value)}
                type="text"
                id="Grade"
                className="input-style-editStudent"
                name="Grade"
              />
            </div>
            <div className="form-editStudent-modal-container">
              <label className="addStudent-label">Bunk Space</label>
              <input
                value={bunkSpace}
                onChange={(e) => setBunkSpace(e.target.value)}
                type="text"
                className="input-style-editStudent"
                placeholder="Bunk Space"
                name="bunkSpace"
              />
            </div>
            <div className="form-editStudent-modal-container">
              <label className="addStudent-label">Assigned CO III</label>
              <input
                value={coThree}
                onChange={(e) => setCoThree(e.target.value)}
                type="text"
                className="input-style-editStudent"
                placeholder="COIII"
                name="coThree"
              />
            </div>
            <div className="form-editStudent-radio-modal-container">
              <div>
                <input
                  onChange={(e) => setIsActive(e.target.value)}
                  type="radio"
                  id="Active"
                  name="IsActive"
                  value={1}
                />
                <label htmlFor="Active">Active</label>
              </div>
              <div>
                <input
                  onChange={(e) => setIsActive(e.target.value)}
                  type="radio"
                  id="inActive"
                  name="IsActive"
                  value={0}
                />
                <label htmlFor="inActive">inActive</label>
              </div>
              <button onClick={onSubmit} className="btn-modal-editStudent">
                Submit
              </button>
            </div>
          </form>

          <DeleteModal ref={deleteModalRef}>
            <h2 className="delete-student-header">Delete Student</h2>
            <div className="modal-content">
              <div className="modal-body">
                {" "}
                <h4>
                  Are You Sure You Want To Delete:
                  <br /> {FirstName} {LastName} {RefNumber}{" "}
                </h4>
              </div>
              <button
                onClick={(e) => handleDelete(e, currentId)}
                className="agree-to-delete-user"
              >
                Yes Delete {FirstName} {LastName}!
              </button>
            </div>
          </DeleteModal>
        </div>
      </Modal>
    </div>
  );
};

export default StudentsList;
