import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../context/Context";

function Navbar() {
  const state = useContext(StoreContext);
  const history = useHistory();
 

  const logout = () => {
   state.setIsAuthenticated(false);
    localStorage.removeItem('token');
    state.setToken('')
    history.push('/');
    state.setErr('');
  }


  return (
    <div>

      {/* navbar ************ */}
     <div className='navbar-main-container'>
   
    <div className='nav2'>
             <div className='logo-placement-container'>
                 <img className='img-log-placement' src='img/logo2.png' alt='logo'></img>
             </div>
             <div className='nav-right-container-lg'>
            
            <a className='nav2-anchors' href='#!'>{state.user && state.user.first_name} {state.user && state.user.last_name}</a>
            <button onClick = {logout}className='nav2-anchors logout-btn'>Sign Out</button>
           
            </div>
             </div>
             </div>
   
    </div>
  );
}
export default Navbar;
