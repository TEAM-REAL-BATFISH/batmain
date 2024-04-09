import React, {useState, useEffect} from 'react';
import axios from 'axios'

const GlobalEvent = props => {
  const going = async() => {
    const data = {}
    data.event_id = props.event_id;
    await axios.post('/event/going', data)
  }

  return(
    <div className="GlobalEventBox">
      <p>{props.event_title}</p>
      <p>Location: {props.location}</p>
      <p>Date: {props.date}</p>
      <div>
        <button id="RSVP" onClick={going}>RSVP</button>
      </div>
    </div>
  );
};

export default GlobalEvent;