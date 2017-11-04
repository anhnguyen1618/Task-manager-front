import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router';

import { fetchTasks, fetchPeople, logout } from '../../redux/api.js';
import { loadTasks, loadPeople } from '../../redux/actions.js'
import Column from "./Column.jsx";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingTasks: true,
      isFetchingPeople: true,
      filterName: ''
    }
  }

  componentDidMount() {
    this.props.loadPeople().then(() => this.setState({ isFetchingPeople: false }))
    this.props.loadTasks().then(() => this.setState({ isFetchingTasks: false }))
  }

  changeFilter = (name) => () => {
    this.setState({ filterName: name });
  }

  logOut() {
    logout().then(res => location.reload())
  }

  render() {
    const { showSidePanel, tasks, people, user } = this.props
    const { isFetchingPeople, isFetchingTasks, filterName } = this.state
    const categories = ['Todo', 'In Progress', 'In Review', 'Done']
    const truncateName = name => (name.length > 6 ? name.substring(0, 4) + '..' : name)
    const filteredTasks = filterName ? tasks.filter(task => task.assignee === filterName) : tasks
    const isFetching = isFetchingPeople || isFetchingTasks
    if (isFetching) {
      return (
        <div className="screen">
      		<center><img src="http://i.imgur.com/DLBS6e5.gif"/></center>
      	</div>)
    }
    return (
      <div className="row main">
      	<div className="top-section">
      		<nav>
      			<div className="container">
      			<img src="https://cdn2.iconfinder.com/data/icons/office-extras/512/Reminder_Note-512.png"/>
      			<div className="pull-right">
	      			{user.role === 'ROLE_HR' && < Link to = {"/employee"} className="btn btn-success">Manage employee</Link>}
	      			<button className="btn btn-default" onClick={this.logOut}>Log out</button>
      			</div>
      			</div>
      		</nav>
      		<div className="container filter">
      			<Col sm={2}><h4>Quick filter:</h4></Col>
      			<Row className="col-md-10">
      			<Col sm={1} onClick={this.changeFilter('')}><span className={!filterName? "filterName": ""}>All</span></Col>
	      		{people.map((person, index) => <Col sm={1} onClick={this.changeFilter(person)} key={index}> <span className={person == filterName ? "filterName": ""}>{truncateName(person)}</span></Col>)}
      			</Row>
      		</div>
      	</div>
      	{categories.map((category, index) => <Column key={index} tasks={filteredTasks} category={category}/>) }
    	</div>

    )
  }
}


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    user: state.user,
    people: state.people.map(person => person.username)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTasks: () => {
      return fetchTasks().then(({ data }) => {
        dispatch(loadTasks(data))
      })
    },
    loadPeople: () => {
      return fetchPeople().then(({ data }) => {
        dispatch(loadPeople(data))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
