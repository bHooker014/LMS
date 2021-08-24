import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import Modal from './modal/Modal';
import { useHistory } from 'react-router-dom';


const Login = ({setAuth}) => {
  const history = useHistory();
  const modalRef = useRef();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [inputRegister, setInputRegister] = useState({
    emailRegister: "",
    passwordRegister: "",
    name: "",
    secretPassword: ""
  });

  const { emailRegister, passwordRegister, name, secretPassword } = inputRegister;
  const onChangeRegister = (e) => {
    setInputRegister({ ...inputRegister, [e.target.name]: e.target.value });
  };
  const { email, password } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const openModal = (e) => {
    modalRef.current.openModal();
  };

  const onSubmitForm = async (e) => {
    e.preventDefault(e);
    try {
      const body = { email, password };

      //fetch is a simple get request
      const response = await fetch("http://localhost:5000/authInstructor/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      // parse data to use it
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token); //setting the token in localStorage
        // if token is true setAuth == true to go to dashboard
        setAuth(true);
        history.push('/dashboard');
      } else {
        setAuth(false);
        toast.warning(parseRes, {
          style: {
            background: 'red !important'
          }
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };


  
  const onSubmitRegisterForm = async (e) => {
    e.preventDefault();

    try {
      const body = { emailRegister, passwordRegister, name, secretPassword };
    
      //fetch is a simple get request
      const response = await fetch("http://localhost:5000/authInstructor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // parse data to use it
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token); //setting the token in localStorage
        // if token is true setAuth == true to go to dashboard
        setAuth(true);
        toast.success("Registered and logged in Successfully");
        history.push('/dashboard')
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="Admin-main-login-container">
      <div className='Admin-main-login-inner-container'>
        <h3 className='header-admin-login'>Instructor Sign In</h3>
        <form onSubmit={onSubmitForm}>
          <div className='login-form-containers'>
        <label className='login-labels'>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e)}
            className='input-form-admin-login'
          />
          </div>
          <div className='login-form-containers'>
          <label className='login-labels'>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
            className='input-form-admin-login'
          />
          </div>
          <button className='btn-admin-login'>Submit</button>
        </form>
        <button className='register-btn' onClick={openModal}>Register</button>
       
        </div>
        <Modal ref={modalRef} >
        <div className="register-container-modal">
        <h4 className='register-header-modal'>Register</h4>
        <form onSubmit={onSubmitRegisterForm}>
          <div className='register-form-containers-div'>
        <label className='login-labels' >Email</label>
          <input
            type="email"
            name="emailRegister"
            placeholder="Email"
            value={emailRegister}
            onChange={(e) => onChangeRegister(e)}
            className='register-form-containers'
          />
         </div>
         <div className='register-form-containers-div'>
          <label className='login-labels'>Password</label>
          <input
            type="password"
            name="passwordRegister"
            placeholder="Password"
            value={passwordRegister}
            onChange={(e) => onChangeRegister(e)}
            className='register-form-containers'
          />
          </div>
          <div className='register-form-containers-div'>
          <label className='login-labels'>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => onChangeRegister(e)}
            className='register-form-containers'
          />
          </div>
          <div className='register-form-containers-div'>
           <label className='login-labels'>Secret Password</label>
          <input
            type="password"
            name="secretPassword"
            placeholder="Secret Password"
            value={secretPassword}
            onChange={(e) => onChangeRegister(e)}
            className='register-form-containers'
          />
          </div>
          <br />
          <button type="submit" className='register-btn-modal'>Submit</button>
        </form>
       
    </div>
        </Modal>
    </div>
  );
};

export default Login;
