import React from 'react'

function Attachment(props) {
    const close = () => {
        props.closeModal()
    }
    const onChange = (e) => {
        let messageObj = {
          ...props.message,
        };
        messageObj[e.target.name] = e.target.files[0];
        props.setMessage(messageObj);
      };
    return (
        <div className="att-modal">
            <h1>Select File</h1>
            <h3>You must zip your project folders before uploading</h3>
            <input type="file" name="file" id="file" onChange={onChange} />
        </div>
    )
}

export default Attachment