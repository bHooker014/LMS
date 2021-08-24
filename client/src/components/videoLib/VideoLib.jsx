import React, { useState, useEffect, useContext, useRef } from "react";
import Modal from "../modal/Modal";
import API from "../../utils/API";
import { MainContext } from "../context/MainContext";
import VideoModal from "./VideoModal";
import { VideoCard } from "./VideoCard";

export function VideoLib(props) {
  const ModalRef = useRef();
  const { videos, setVideos } = useContext(MainContext);
  const [cat, setCat] = useState("HTML");
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

  // When the page renders the use effect is setting the results
  //
  useEffect(() => {
    API.getAllVideos()
      .then((result) => {
        let videoResults = result.data.videos;
        setVideos(videoResults);
      })
      .catch((err) => console.error(err.message));
  }, [setVideos, videos]);

  const catSelectHandle = (subject) => {
    setCat(subject);
  };
  return (
    <div className="video-lib">
      <div className="lib-top">
        <div className="lib-logo">
          <div className="lib-title">Repository for Video's, Repo's and Other Resoures</div>
          <button
            className="video-btn"
            onClick={() => ModalRef.current.openModal()}
          >
            Add File
          </button>
          <Modal ref={ModalRef}>
            <VideoModal
              closer={() => ModalRef.current.close()}
              sub={subjectList}
            ></VideoModal>
          </Modal>
        </div>
        <div className="lib-title">
          {cat}
        </div>
      </div>
      <div className="video-left">
        <div className="left-title">
          <h3>Technologies</h3>
        </div>
        <div className="sideNav-container-for-btns">
          {subjectList && subjectList.map((n, i) => {
            return (
              <button
                className="btn-anchor-side-nav"
                onClick={() => catSelectHandle(n.sub)}
                key={i}
              >
                {n.sub}
              </button>
            );
          })}
        </div>
      </div>

      <div className="video-right">
        {videos &&
          videos
            .filter((vid) => cat === vid.category)
            .map((n, i) => <VideoCard key={i} video={n}></VideoCard>)}
      </div>
    </div>
  );
}
