import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router';

import { fetchTasks, fetchPeople, logout } from '../../redux/api';
import { loadTasks, loadPeople } from '../../redux/actions'
import { getAllUsers, getCurrentUser } from '../../redux/selectors/users';
import { getAllTasks } from '../../redux/selectors/tasks';
import Column from "../presentational/Column.jsx";

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
    const { loadPeople, loadTasks } = this.props

    loadPeople().then(() => this.setState({ isFetchingPeople: false }))
    loadTasks().then(() => this.setState({ isFetchingTasks: false }))
  }

  changeFilter = (name) => {
    this.setState({ filterName: name });
  }

  logOut() {
    logout().then(res => location.reload())
  }

  render() {
    const { showSidePanel, tasks, users, currentUser } = this.props
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
              < Link to = {"/employee"} className="btn btn-success">Manage employee</Link>
	      			<button className="btn btn-default" onClick={this.logOut}>Log out</button>
      			</div>
      			</div>
      		</nav>

          <div className="container filter__container">
            <div className="filter__title"><h4>Quick filter:</h4></div>
            <div 
              className={!filterName ? "filter__highlight filter__item": "filter__item"}
              onClick={() => this.changeFilter('')}>
              All
            </div>
            {users.map(person => (
              <div 
                className={person.userName == filterName ? "filter__highlight filter__item": "filter__item"}
                onClick={() => this.changeFilter(person.userName)}
                key={person.userName}>
                {person.userName}
              </div>))}
          </div>
      		
      	</div>
      	{categories.map((category, index) => <Column key={index} tasks={filteredTasks} category={category}/>) }
    	</div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    tasks: getAllTasks(state),
    currentUser: getCurrentUser(state),
    users: getAllUsers(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTasks: () => dispatch(fetchTasks()),
    loadPeople: () => dispatch(fetchPeople())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
