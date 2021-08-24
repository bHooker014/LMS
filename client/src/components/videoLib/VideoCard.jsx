import React, { useContext } from "react";
import API from "../../utils/API";
import { MainContext } from "../context/MainContext";

export function VideoCard(props) {
  const { videos, setVideos } = useContext(MainContext);


  // The delete handler makes the api call to remove the video from
  // the data base then filters the videos to update the rendered cards
  const deleteHandle = (file) => {

    try {
      API.deleteVideo(file)
        .then(res => {
          setVideos(videos)
        })
        .catch((err) => console.error(err.message));
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="video-card">
      <div className="video-card-header">
        <h3 className="video-card-header">{props.video.category}</h3>
        <h4 className="video-card-name">{props.video.name.slice(0, 25)}</h4>
      </div>
      <div className="videos-card-description">
        <h5>{props.video.description.slice(0, 93)}</h5>
        <button
          className="video-btn delete-btn"
          onClick={() => deleteHandle(props.video.ref)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
