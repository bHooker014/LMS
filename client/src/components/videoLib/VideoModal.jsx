import React, { useState, useContext } from "react";
import API from "../../utils/API";
import { MainContext } from "../context/MainContext";

function VideoModal(props) {
  const State = useContext(MainContext);
  const [videoInfo, setVideoInfo] = useState({
    description: "",
    category: "",
  });
  const [newVideo, setNewVideo] = useState({
    // file: null,
    file: "",
  });

  const subjectList = [
    {
      sub: "HTML",
      value: 1,
    },
    {
      sub: "CSS",
      value: 2,
    },
    {
      sub: "JAVASCRIPT",
      value: 3,
    },
    {
      sub: "JQuery",
      value: 4,
    },
    {
      sub: "BootStrap",
      value: 5,
    },
    {
      sub: "D3",
      value: 6,
    },
    {
      sub: "SASS",
      value: 7,
    },
    {
      sub: "React",
      value: 8,
    },
    {
      sub: "Career Readiness",
      value: 9,
    },
  ];

  const fileChangeHandle = (e) => {
    let videoObj = {
      ...newVideo,
    };
    videoObj[e.target.name] = e.target.files[0];
    setNewVideo(videoObj);
  };

  const videoInfoHandle = (e) => {
    let infoObj = {
      ...videoInfo,
    };
    infoObj[e.target.name] = [e.target.value];
    setVideoInfo(infoObj);
 
  };


  const Submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", newVideo.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    API.uploadVideo(formData, config, videoInfo)
    .then(res => {
       State.setVideos(State.videos)
       props.closer()
    })
    .catch((err) => console.error(err.message));
  };
  return (
    <div className="vid-modal">
      <div className="vid-input">
        <label htmlFor="myfile">
          <h1>Select File</h1>
        </label>
        <label htmlFor="description">Description</label>
        <br></br>
        <textarea
          name="description"
          id="description"
          className="descriptiion-box"
          onChange={videoInfoHandle}
        ></textarea>
        <br></br>
        <input
          className="inputCompose"
          value={videoInfo.category}
          list="categories"
          placeholder="select subject"
          name="category"
          // Will change the default value of the reciever email from the drop down
          // which will effect the over all value of the input
          onChange={videoInfoHandle}
        ></input>
        <datalist id="categories">
          {/* Mapping thru the subject list on line   */}
          {subjectList && subjectList.map((n, i) => {
            return (
              <option value={n.sub} key={i}>
                {n.sub}
              </option>
            );
          })}
        </datalist>

        <input
          className="vid-file"
          type="file"
          name="file"
          id="myfile"
          onChange={fileChangeHandle}
        />
        <br></br>
      </div>
      <br></br>
      <div className="vid-title-preview">
        {newVideo.file ? (
          <div className="vid-title-box">
            <label htmlFor="category">
              <h3>Category</h3>
            </label>
        <div className="category">{videoInfo.category}</div>
            <label htmlFor="fileName">
              <h3>Title</h3>
            </label>

            <div id="fileName">{newVideo.file.name}</div>
            <br></br>
            <button className="video-btn" onClick={(e) => Submit(e)}>
              ADD
            </button>
          </div>
        ) : null}
      </div>
      <br></br>
    </div>
  );
}

export default VideoModal;
