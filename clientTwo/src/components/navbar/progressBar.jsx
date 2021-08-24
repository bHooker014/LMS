import React from 'react';

export const ProgressBar = (props)=>{

    return (
        <div className="progress">
      <div className="progress-bar" role="progressbar"
         aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"
         style={{width: `${props.percent}%`}}
         >
      
      </div>
    </div>
    )
}