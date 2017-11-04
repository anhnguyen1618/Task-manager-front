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
  const person = state.people.find(person => person.username === assignee)
  return {
    avatar_url: person && person.avatar_url ? person.avatar_url : 'https://pbs.twimg.com/profile_images/1980294624/DJT_Headshot_V2_400x400.jpg'
  }
}


export default connect(mapStateToProps, null)(Ticket);
