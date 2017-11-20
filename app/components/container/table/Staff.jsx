import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Form from "./Form.jsx";
import TableWrapper from "./TableWrapper.jsx";

import { fetchPeople } from '../../../redux/api.js';
import { loadPeople } from '../../../redux/actions.js'

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
      <TableWrapper/>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.users.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPeople: () => dispatch(fetchPeople())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff)
