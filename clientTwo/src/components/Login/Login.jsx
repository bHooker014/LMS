import React, { useState, useContext } from "react";
import { StoreContext } from "../context/Context";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

 function Login() {
  const state = useContext(StoreContext);
  const history = useHistory();
  const [user, setUser] = useState({
    doc: "",
    password: "",
  });

  const onChange = (event) => {
    let userObj = {
      ...user
    };
    userObj[event.target.name] = event.target.value;
    setUser(userObj);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const body = user;

      //fetch is a simple get request
      const response = await fetch("http://localhost:5000/api/main/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      // parse data to use it
      const parseRes = await response.json();

      if(parseRes.msg && !parseRes.token){
        state.setErr(parseRes.msg)
      }

    
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token); //setting the token in localStorage
        // if token is true setIsAuthenticated == true to go to dashboard
        state.setIsLoading(true);
        state.setIsAuthenticated(true);
        state.setUser(parseRes.user[0]);
        state.setReportCards(parseRes.reportCards)
        state.setToken(parseRes.token)
        
        setTimeout(() => {
          state.setIsLoading(false)
        }, 1000)
        history.push('/dashboard');
      } else {
        state.setIsAuthenticated(false);
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

    return (
        <div className='login-main-container'>
            <div className='login-inner-container'>
                
              <form onSubmit={onSubmit}>
              <h3>Sign In</h3>
              <div className='login-user'>
                  <label>User Name</label>
                  <input
                  className='input-style'
                    type="text"
                    name="doc"
                    id="name"
                    placeholder="User DOC Number"
                    onChange={onChange}
                  />
                </div>
                <div className='login-user'>
                  <label>Password</label>
                  <input
                  className='input-style'
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={onChange}
                  /></div>
                <div className='login-user'>
                  <button className='sign-in-btn' type='submit'>Sign In</button>
                </div>
               <h3 style={{color: 'darkred'}}>{state.err}</h3>
              </form>
             
            </div>
        </div>
    )
}

export default Login
