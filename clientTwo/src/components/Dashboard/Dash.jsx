import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Navbar from '../navbar/Navbar'


 function Dash (){
    const history = useHistory();

    const onClickCodeEditor = () => {
        history.push('/code-editor')
        }

    return( 
        <div className='dashboard'>
             
         <Navbar />   
       
         
         
      

         <div className='code'><h1>Code Editor</h1></div>
         
        
         <div className='exercise'>
             <h1>Daily Exercise</h1>
             <button onClick={onClickCodeEditor}>Code-Editor</button>
             </div>
         <div className='message'><h1>Message Center</h1></div>
         <div className='progress-bar'><h1>Progress Bar</h1></div>
         <div className='footer'><h1>Footer</h1></div>
         
        
        </div>
    )
}

export default Dash