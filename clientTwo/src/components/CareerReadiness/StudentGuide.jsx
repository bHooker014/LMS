import React, { useState } from 'react';
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import { Page } from 'react-pdf';

function StudentGuide() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function incrementPage (currentPage) {
    setPageNumber(currentPage + 1)
    console.log(pageNumber)
  }
  function decrementPage (currentPage) {
    setPageNumber(currentPage - 1)
    console.log(pageNumber)
  }
  return (
    <div>
      <div className="page-btns">
        <button onClick={() => decrementPage(pageNumber)}>Previous</button>
        <button onClick={() => incrementPage(pageNumber)}>Next</button>
      </div>
      <Document
        file="PDF/Persevere_Student_Guide.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}

export default StudentGuide