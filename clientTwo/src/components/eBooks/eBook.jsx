import React, { useState } from 'react';
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import { Page } from 'react-pdf';


const  EBook = (props) => {
  const [numPages, setNumPages] = useState(null);
console.log(props.file)
console.log('PDF/Student_Onboarding_Handbook.pdf')
console.log('PDF/Persevere_Student_Guide.pdf')
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
  
      <Document
        file={props.file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={props.page} />
      </Document>
      <p>Page {props.page} of {numPages}</p>
    </div>
  );
}

export default EBook;