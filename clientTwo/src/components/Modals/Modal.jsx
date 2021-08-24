
import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import ReactDOM from 'react-dom'


export const Modal = forwardRef((props, ref) => {

    const inside = useRef()
    const [show, setShow] = useState(false);

const open = ()=>{
    setShow(true)
                document.getElementById('body').classList.add('modalOpen')
}

const close= ()=>{
    setShow(false)
            document.getElementById('body').classList.remove('modalOpen')
}



useImperativeHandle(ref,() => {
        return {
            openModal: ()=>  {
                setShow(true)
                document.getElementById('body').classList.add('modalOpen')
            },
            closeModal: () => {setShow(false)
            document.getElementById('body').classList.remove('modalOpen')
        }}
    })   


  
//   const updateMessage = (msg) => props.updateMessage(msg)
//     const handleShow = () => setShow(true);
  
if (show){

   return  ReactDOM.createPortal( <div className={props.customClass?`modalWrapper ${props.customClass}`: 'modalWrapper'}>
    <div  onClick={(e)=> close()} className="modalBackdrop">
        </div>
         <div ref={inside} className="modalBox"> 
        <button  className ='closing-icon'  onClick={close} > <i  className="fas fa-times fa-2x"></i> </button>
            {props.children}
        </div>
       
    
        
      </div>, document.getElementById('modal-root'))

}else{
    return null
}

    
  })

 