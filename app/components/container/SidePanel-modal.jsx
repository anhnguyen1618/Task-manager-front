import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap'
import { submit } from 'redux-form'
import uuid from 'uuid/v4'

import { addTasks, updateTasks, deleteTask, loadTasks } from "../../redux/actions.js";
import { addTask, fetchTasks, modifyTask, eraseTask } from "../../redux/api.js";

import { getTaskbyID } from '../../redux/selectors/tasks'

import Form from "./Form.jsx";

class SideModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
    this.isAdding = !this.props.initialValues
  }

  toggleEdit = () => {
    this.setState({ isEditing: true });
  }

  onSave = (values) => {
    if (this.isAdding) {
      values.assignor = this.props.user.username
      if (!values.assignee) values.assignee = this.props.user.username
      console.log(values);
      addTask(values)
        .then(res => {
          this.props.refreshTasks()
          this.props.hideSidePanel()
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      modifyTask(values)
        .then(res => {
          this.props.updateTask(values)
          this.setState({ isEditing: false })
        })
    }
  }

  renderInfo() {
    const { initialValues: { id, title, status, assignee, assignor, startTime, endTime, description, comments } } = this.props
    return (
      <div className="panel-content">
			<h4>Details</h4>
			<text>Status: {status}</text>
			<hr/>
			<h4>People</h4>
			<text>Assignor: {assignor}</text>
			<br/>
			<text>Assignee: {assignee}</text>
			<hr/>
			<h4>Time</h4>
			<text>Start time: {startTime}</text><br/>
			<text>End time: {endTime}</text>
			<hr/>
			<h4>Description:</h4>
			<text>
				{description}
			</text>
		</div>
    )
  }

  render() {
    const { hideSidePanel, initialValues, deleteTask, handleSave, userRole } = this.props
    const { isEditing } = this.state
    const { isAdding } = this
    const showForm = isEditing || isAdding
    const isAdmin = userRole === 'ROLE_ADMIN'
    const removeTask = () => {
      eraseTask(initialValues.id)
        .then(res => {
          hideSidePanel()
          deleteTask(initialValues)
        })
    }
    return (
      <div>
	    	<div className="panel-header">
	    		{!isAdding ? <h2>[{initialValues.id}] {initialValues.title}</h2>: <h2>ADD TASK</h2>}
			</div>

			{showForm? <Form initialValues={initialValues} onSubmit={this.onSave}/> : this.renderInfo()}

			<div className="panel-footer">
				<div className="button-group">
	    			{!isAdding && <button type="button" disabled={!isAdmin} onClick={removeTask} className="btn btn-danger">Delete</button> }
	    			<div className="pull-right">
	    				<button type="button" onClick={hideSidePanel} className="btn btn-primary">Cancel</button>	
	    				<button 
	    					type='button'
	    					className="btn btn-info" 
	    					disabled={!isAdmin}
	    					onClick={showForm ? handleSave : this.toggleEdit}>
	    					{showForm ? 'Save' : 'Edit'}
	    				</button>  
	    			</div>	    			
				</div>
			</div>
		</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: getTaskbyID(state.selectedTask),
    user: state.people[0],
    userRole: state.user.role
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshTasks: () => {
      fetchTasks().then(({ data }) => {
        dispatch(loadTasks(data))
      })
    },
    hideSidePanel: () => {
      dispatch({ type: "HIDE_SIDE_PANEL" })
    },
    addTask: (task) => {
      dispatch(addTasks(task))
    },
    updateTask: (task) => {
      dispatch(updateTasks(task))
    },
    deleteTask: (task) => {
      dispatch(deleteTask(task))
    },
    handleSave: () => {
      dispatch(submit('detailForm'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideModal)
