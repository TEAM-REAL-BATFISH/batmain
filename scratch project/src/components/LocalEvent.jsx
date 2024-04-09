import React from 'react';

const LocalEvent = props => {



  
  return(
    <div className="LocalEventBox">
      <p>{props.event_title}</p>
      <p>Location: {props.location}</p>
      <p>Date: {props.date}</p>
      <div>
      <button id="Cancel" onClick={props.onCancel}>Cannot Attend</button>
      </div>
    </div>
  );
};



export default LocalEvent;