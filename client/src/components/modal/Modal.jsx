import React, { useState, forwardRef, useImperativeHandle} from 'react';

import ReactDOM from 'react-dom';




const Modal = forwardRef((props, ref) => {
  
    const [display, setDisplay] = useState(false);
     
     useImperativeHandle(
         ref,
         () => {
              return{
             openModal: () => open(),
             close: () => close()
             }
         });

   const open = () => {
       setDisplay(true)
   }
 
   const close = () => {
     setDisplay(false)
 }
 
 
          if(display) {
             
           return ReactDOM.createPortal(<div className={"modal-wrapper-one"}>   
         <div onClick= {close} className={"modal-backdrop-one"} />
         <div className={"modal-box-one"}>
         <button  className ='closing-icon'  onClick={close} > <i  className="fas fa-times fa-2x"></i> </button>
         {props.children}
         </div>
         </div>, document.getElementById('modal-root'))
  
          }
     
       return null;
     }
 )

export default Modal