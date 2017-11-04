import React from 'react';
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-drag-and-drop'

import Ticket from "./Ticket.jsx";
import { updateTasks } from '../../redux/actions.js'
import { getTaskbyID } from '../../redux/taskSelector.js'
import { modifyTask } from "../../redux/api.js";

const Column = (props) => {
  const { tasks, category, showSidePanel, changeCategory, user } = props
  console.log(tasks);
  const filteredTasks = tasks.filter(task => task.status === category)

  const isAdmin = user.role === 'ROLE_ADMIN'

  const handleDrop = ({ task: id }) => {
    const updatedTask = Object.assign({}, getTaskbyID(id), { status: category });
    changeCategory(updatedTask)
    modifyTask(updatedTask)
  }
  return (
    <div className="col-sm-3 ticket">
    	<h2>{category} {category ==='Todo'&& <button type="button" disabled={!isAdmin} onClick={showSidePanel('')} className="btn btn-success pull-right">+</button>}</h2>
    	<Droppable
    		types={['task']}
        	onDrop={data => handleDrop(data)}>
	    	<ul>
		  		{filteredTasks.map((task,index) =>
		  			(<Draggable data={task.id} key={index} type="task"> 
		  				<Ticket showSidePanel={showSidePanel(task.id)} {...task}/> 
		  			</Draggable>)
		  		)}
		  	</ul> 
	  	</Droppable>
  	</div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSidePanel: id => e => {
      dispatch({ type: "ADD_SELECTED_ID", id });
      dispatch({ type: "SHOW_SIDE_PANEL" });
    },
    changeCategory: (task) => {
      dispatch(updateTasks(task))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
