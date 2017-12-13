import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap'


const stages = ['Todo', 'In Progress', 'In Review', 'Done']

const Form = (props) => {
  const { handleSubmit, employees } = props
  return (
    <div className="panel-content">
			<form onSubmit={handleSubmit}>
				<h4>Details</h4>
				<Row>
					<Col sm={2}><label>Title:</label></Col>
					<Col sm={8}>
						<Field name="title" component="input"/>				          
					</Col>
			  </Row>

				<Row>
					<Col sm={2}><label>Status:</label></Col>
					<Col sm={8}>
						<Field name="status" component="select">
							{stages.map(status =>
							<option value={status} key={status}>{status}</option>)}
						</Field>
					</Col>			    	
				</Row>
				
				<hr/>
				<h4>People</h4>
				<Row>
					<Col md={2}>
						<label>Assignee:</label>
					</Col>
					<Col md={8}>
						<Field name="assignee" component="select">
							{employees.map(({userName}, index) =>
							<option value={userName} key={userName}>{userName}</option>)}
						</Field>
					</Col>
			  </Row>
				<hr/>

				<h4>Time</h4>
				<Row>
					<Col sm={2}>
						<label>Deadline</label>
					</Col>
					<Col sm={8}>
						<Field name="endTime" component="input" type="date"/>
					</Col>
				</Row>
				<hr/>

				<div>
					<label>Description</label>
					<div>
						<Field name="description" component="textarea"/>
					</div>
				</div>
			</form>
		</div>
  )
}

const detailForm = reduxForm({
  form: 'detailForm'
})(Form)

const mapStateToProps = (state) => {
  return {
    employees: state.users.data
  }
}

export default connect(mapStateToProps, null)(detailForm)
