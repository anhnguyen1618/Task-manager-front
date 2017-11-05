import React from 'react';
import { connect } from 'react-redux';

const Ticket = (props) => {
  const { title, startTime, endTime, assignee, id, showSidePanel, avatar_url } = props
  return (
    <li onClick={showSidePanel}>
		<h3>{`[${id}] `}{title.length<14 ? title : title.substring(0,13)+'...' }</h3>
		<span>Date: {startTime}</span>
		<span>Deadline: {endTime}</span>
		<span>By <img src={avatar_url}/><strong>{assignee}</strong></span>
	</li>
  )
}

const mapStateToProps = (state, { assignee }) => {
  const person = state.users.data.find(person => person.username === assignee)
  return {
    avatar_url: person && person.avatar_url ? person.avatar_url : 'http://i0.kym-cdn.com/entries/icons/medium/000/005/180/YaoMingMeme.jpg'
  }
}


export default connect(mapStateToProps, null)(Ticket);
