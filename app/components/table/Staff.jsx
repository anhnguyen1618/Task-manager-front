import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Form from "./Form.jsx";
import Confirmation from "./Confirmation.jsx";
import TableWrapper from "./TableWrapper.jsx";

import { fetchPeople } from '../../redux/api.js';
import { loadPeople } from '../../redux/actions.js'

export class Staff extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.people.length) this.props.fetchPeople()
  }

  render() {
    return (
      <div className="container" id="staff">
			<Form></Form>
			<Confirmation/>
			<TableWrapper/>
		</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.people
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPeople: () => {
      return fetchPeople().then(({ data }) => {
        dispatch(loadPeople(data))
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff)
