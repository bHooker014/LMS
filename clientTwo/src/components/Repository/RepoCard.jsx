import React, { useContext } from "react";
import API from "../../utils/API";
import FileSaver from "file-saver";

export function RepoCard(props) {

  const downloadHandle = (file, type) => {
    API.downloadVideo(file).then((response) => {
      FileSaver.saveAs(response.data, type);
    })
    .catch(err => console.log(err))

  };
  return (
    <div className="video-card">
      <div className="video-card-header">
        <h3 className="video-card-header">{props.video.category}</h3>
        <h4 className="video-card-name">{props.video.name.slice(0, 25)}</h4>
      </div>
      <div className="videos-card-description">
        <h5>{props.video.description.slice(0, 93)}</h5>
      </div>
      <button
        className="video-btn delete-btn"
        onClick={() => downloadHandle(props.video.ref, props.video.contentType)}
      >
        Download
      </button>
    </div>
  );
}
