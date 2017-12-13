import React from 'react';
import { connect } from 'react-redux';

const Ticket = (props) => {
  const { title, startTime, endTime, assignee, id, showSidePanel, avatar_url } = props
  return (
    <li onClick={showSidePanel}>
      <h3> {`[${id}] `}{title.length < 14 ? title : title.substring(0,13) + '...' } </h3>
      <span> Date: {startTime} </span>
      <span> Deadline: {endTime} </span>
      <span> By <img src="http://i0.kym-cdn.com/entries/icons/mobile/000/000/091/TrollFace.jpg"/><strong>{assignee}</strong></span>
    </li>
  )
}

export default Ticket
