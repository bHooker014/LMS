import React, { useEffect, useContext, useRef, useState } from "react";
import API from "../../utils/API";
import { MainContext } from "../context/MainContext";
import { useHistory } from "react-router-dom";
import Modal from "../modal/Modal";
import { toast } from "react-toastify";
import DeleteModal from "../modal/DeleteModal/DeleteModal";

const EditAdmin = ({setAuth}) => {
	const state = useContext(MainContext);
  const { instructors, setInstructors } = useContext(MainContext);
  let history = useHistory();
  const modalRef = useRef();
  const deleteModalRef = useRef();
  const [instructorName, setInstructorName] = useState("");
  const [instructorClass, setInstructorClass] = useState("");
  const [instructorId, setInstructorId] = useState("");

  useEffect(() => {
    const getAInstr = async () =>
      await API.getAInstructor(instructorId)
        .then((res) => {
          setInstructorName(res.data.instructor.instructor_name);
          setInstructorClass(res.data.instructor.instructor_class);
          setInstructorId(res.data.instructor.instructor_id);
        })
        .catch((err) => console.error(err.message));
    getAInstr();
  }, [instructorId]);

  useEffect(() => {
    API.getAllInstructors()
      .then((res) => {
        setInstructors(res.data.instructors);
      })
      .catch((err) => console.error(err.message));
  }, [setInstructors]);

  // Delete Modal
  const handleDelete = async (e, id) => {
    e.preventDefault();
    API.deleteInstructor(id)
      .then((res) => {
        //  deletes emails written by instructor
        if (res.data.arrOfEmails.length > 0) {
          res.data.arrOfEmails.map((obj) => {
            API.deleteInstructorEmail(obj.ref, obj.id)
              .then()
              .catch((err) => console.log(err));
          });
        }
        if(state.instructor.instructor_id === id){
        localStorage.removeItem("token")
        setAuth(false)
        history.push("/");
        toast.success(`${instructorName} instructor has been deleted`);
        } else {
          history.push("/dashboard");
          toast.success(`${instructorName} instructor has been deleted`);
        }
      })
      .catch((err) => console.error(err.message));
  };

  const handleUpdate = (e, id, instructorName, instructorClass) => {
    e.stopPropagation();
    setInstructorId(id);
    setInstructorName(instructorName);
    setInstructorClass(instructorClass);
    modalRef.current.openModal();
  };

  const deleteUserModal = (e, id) => {
    e.stopPropagation();
    deleteModalRef.current.openModal();
  };

  //submit handler
  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      instructorName,
      instructorClass,
    };

    API.updateInstructor(instructorId, body)
      .then((res) => {
        toast.success(`Instructor info has been updated`);
      })
      .catch((err) => console.error(err.message));
    history.push("/");
  };

  return (
    <div className="studentfinder-main-container">
      <div className="admin-container">
      <table className="table-for-active-students">
        <thead>
          <tr className="student-keys-for-class">
            <th>Instructor</th>
            <th>Instructor Email</th>
            <th>AM or PM Class</th>
            <th>Edit Instructor</th>
          </tr>
        </thead>
        <tbody className="student-map-keys-container">
          {instructors &&
            instructors.map((n) => (
              <tr className="student-map-keys" key={n.instructor_id}>
                <td className="keys-holder">{`${n.instructor_name}`}</td>
                <td className="keys-holder">{`${n.instructor_email}`}</td>
                <td className="keys-holder">{n.instructor_class}</td>
                <td className="keys-holder">
                  <button
                    className="edit-student-btn"
                    onClick={(e) =>
                      handleUpdate(
                        e,
                        n.instructor_id,
                        n.instructor_name,
                        n.instructor_class
                      )
                    }
                  >
                    Edit Instructor
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal ref={modalRef}>
        <div className="edit-student-main-modal-container">
          <h2 className="header-edit-modal">
            Instructor Update{" "}
            <button onClick={deleteUserModal} className="delete-button-student">
              Delete
            </button>
          </h2>
          <form action="POST">
            <div className="form-editStudent-modal-container">
              <label htmlFor="first_name">First Name</label>
              <input
                value={instructorName}
                onChange={(e) => setInstructorName(e.target.value)}
                type="text"
                id="instructorName"
                className="input-style-editStudent"
                name="instructorName"
              />
            </div>
            <div className="form-editStudent-radio-modal-container">
              <div>
                <input
                  onChange={(e) => setInstructorClass(e.target.value)}
                  type="radio"
                  id="Active"
                  name="instructorClass"
                  value={"AM"}
                />
                <label htmlFor="Active">AM Class</label>
              </div>
              <div>
                <input
                  onChange={(e) => setInstructorClass(e.target.value)}
                  type="radio"
                  id="inActive"
                  name="instructorClass"
                  value={"PM"}
                />
                <label htmlFor="inActive">PM Class</label>
              </div>
              <button onClick={onSubmit} className="btn-modal-editStudent">
                Submit
              </button>
            </div>
          </form>

          <DeleteModal ref={deleteModalRef}>
            <h2 className="delete-student-header">Delete Instructor</h2>
            <div className="modal-content">
              <div className="modal-body">
                {" "}
                <h4>
                  Are You Sure You Want To Delete:
                  <br /> {instructorName}{" "}
                </h4>
              </div>
              <button
                onClick={(e) => handleDelete(e, instructorId)}
                className="agree-to-delete-user"
              >
                Yes Delete {instructorName}!
              </button>
            </div>
          </DeleteModal>
        </div>
      </Modal>
    </div>
    </div>
  );
};

export default EditAdmin;
