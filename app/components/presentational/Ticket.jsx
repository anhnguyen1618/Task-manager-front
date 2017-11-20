import React from 'react';
import { connect } from 'react-redux';
import { generateRandomImage } from '../../helpers';

const Ticket = (props) => {
  const { title, startTime, endTime, assignee, id, showSidePanel, avatar_url } = props
  return (
    <li onClick={showSidePanel}>
      <h3> {`[${id}] `}{title.length < 14 ? title : title.substring(0,13) + '...' } </h3>
      <span> Date: {startTime} </span>
      <span> Deadline: {endTime} </span>
      <span> By <img src={generateRandomImage()}/><strong>{assignee}</strong></span>
    </li>
  )
}

export default Ticket
