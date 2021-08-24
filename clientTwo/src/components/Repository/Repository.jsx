import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import DATASETS from "../../utils/DATASETS"
import { StoreContext } from "../context/Context";
import { RepoCard } from "./RepoCard";

export function Repository(props) {

  const history = useHistory();
  const { videos, setVideos } = useContext(StoreContext);
  const [cat, setCat] = useState("HTML");

  // When the page renders the use effect is setting the results
  //
  useEffect(() => {
    API.getAllVideos()
      .then((result) => {
        let videoResults = result.data.videos;
        setVideos(videoResults);
      })
      .catch((err) => console.error(err.message));
  }, [setVideos]);

  const catSelectHandle = (subject) => {
    setCat(subject);
  };

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
          <div className="lib-title">Repository for Video's, Repo's and Other Resoures</div>
        </div>
        <div className="lib-title-right">
          {cat}
        </div>
      </div>
      <div className="video-left">
        <div className="left-title">
          <h3>Technologies</h3>
        </div>
        <div className="sideNav-container-for-btns">
          {DATASETS.Technologies && DATASETS.Technologies.map((n, i) => {
            return (
              <button
                className="video-btn video-btn-width-8rem"
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
          videos.filter(vid => cat === vid.category).map((n, i) => <RepoCard key={i} video={n}></RepoCard>)}
      </div>
    </div>
  );
}
