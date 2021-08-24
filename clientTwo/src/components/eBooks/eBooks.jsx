import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import DATASETS from "../../utils/DATASETS"
import { StoreContext } from "../context/Context";
import EBook from "../eBooks/eBook";

export function EBooks(props) {

  const history = useHistory();
  const State = useContext(StoreContext);
  const [chap, setChap] = useState("");
  const [subjectPicker, setSubjectPicker] = useState("Technologies")
  const [dataSet, setDataSet] = useState([])
  const [page, setPage] = useState(1);
  const [chapters, setChapters] = useState('');
  const [file, setFile] = useState('')

console.log(chapters)
  const chapSelectHandle = (subject) => {
    setChap(subject);
  };


  function incrementPage (currentPage) {
    setPage(currentPage + 1)
  }
  function decrementPage (currentPage) {
    setPage(currentPage - 1)
  }

  return (
    <div className="video-lib">
      <div className="lib-top">
        <div className="lib-logo">
          <div
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            <i className="fas fa-home fa-2x home-btn-lib"></i>
          </div>
          <div className="lib-title">Persevere's eBooks</div>
        </div>
            {DATASETS.eBookSubjects.map((topic,i) =>{
              return (
              <button
              className="video-btn"
              onClick={() => {
                setFile(topic.file)
                console.log(topic.topic);
                setSubjectPicker(topic);
                setChapters(topic.chapters);
              }}
              >
                {topic.topic}
              </button>

              )})}
        <div className="lib-title-right">
          {/* {cat} */}
        </div>
      </div>
      <div className="video-left">
      <div className="page-btns">
        <button onClick={() => decrementPage(page)}>Previous</button>
        <button onClick={() => incrementPage(page)}>Next</button>
      </div>
        <div className="left-title">
          <h3>Chapters</h3>
        </div>
        <div className="sideNav-container-for-btns">
          {chapters && chapters.map((n, i) => {
            return (
              <button
                className="video-btn video-btn-width-8rem"
                onClick={() => setPage(n.page)}
                key={i}
              >
                Chapter {n.chap}
              </button>
            );
          })}
        </div>
      </div>

      <div className="video-right">
      <EBook page={page} file={file}></EBook>
      </div>
    </div>
  );
}
