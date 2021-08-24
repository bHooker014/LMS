import React, { useState, useContext } from "react";
import API from "../../utils/API";
import { MainContext } from "../context/MainContext";

const AddStudents = () => {
  const { setStudents } = useContext(MainContext);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [RefNumber, setRefNumber] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      FirstName,
      LastName,
      RefNumber,
    };
    API.createStudent(body)
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => console.error(err));
    setFirstName("");
    setLastName("");
    setRefNumber("");
  };

  return (
    <div className="student-addStudent">
      <form action="POST">
        <div className="add-student-inner-container">
          <h4 className="header_add_student">Add New Student</h4>
          <div className="add-student-input-containers">
            <div className="container-inside-container">
              <label className="addStudent-label">First Name</label>
              <input
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="add-student-input-style"
                placeholder="First Name"
              />

              <label className="addStudent-label">Last Name</label>
              <input
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="add-student-input-style"
                placeholder="Last Name"
              />

              <label className="addStudent-label">ADC Number</label>
              <input
                value={RefNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                type="text"
                className="add-student-input-style"
                placeholder="Student Number"
              />
              <button onClick={onSubmit} type="submit" className="add-btn-form">
                Add Student
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudents;
