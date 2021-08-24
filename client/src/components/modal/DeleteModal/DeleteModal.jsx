
import React, { useState, forwardRef, useImperativeHandle} from 'react';

import ReactDOM from 'react-dom';

const DeleteModal = forwardRef((props, ref) => {
  
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
         </div>, document.getElementById('delete-modal-root'))
  
          }
     
       return null;
     }
 )

export default DeleteModal








// import React from "react";


// const DeleteModal = ({
//   show,
//   close,
//   handleDelete,
//   id,
//   FirstName,
//   LastName,
//   RefNumber,
// }) => {
//   return (
//     <div
//       className="modal-wrapper"
//       style={{
//         transform: show ? "translateY(0vh)" : "translateY(-100vh)",
//         opacity: show ? "1" : "0",
//       }}
//     >
//       <div className="modal-header">
//         <p>Welcome To Our Site</p>
//         <span onClick={close} className="close-modal-btn">
//           x
//         </span>
//       </div>
//       <div className="modal-content">
//         <div className="modal-body">
//           <h4>
//             Are You Sure You Want To Delete:<br/> {FirstName} {LastName} {RefNumber}{" "}
//             ?
//           </h4>
//         </div>
//         <button onClick={(e) => handleDelete(e, id)} className="btn btn-danger">
//           Yes Delete {FirstName} {LastName} {RefNumber}!
//         </button>
//         <div className="modal-footer">
//           <button onClick={close} className="btn-cancel">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteModal;