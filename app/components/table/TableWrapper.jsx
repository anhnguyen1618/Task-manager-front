import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Table from "./Table.jsx";

class TableWrapper extends React.Component {
  static propTypes = {
    sortBy: React.PropTypes.string.isRequired,
    sortOrder: React.PropTypes.string.isRequired,
    people: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }


  render() {
    const { people, sortBy, sortOrder } = this.props
    const list = sortPeople(people, sortBy, sortOrder)
    return <div>
                <Table paginatedPeople={list}/>          
            </div>
  }
}
const sortPeople = (people, sortBy, sortOrder) => {
  /*
    arguments: list of people, sort category, sort order
    return list after being shorted
  */
  people.sort((a, b) => {
    const sortValueAscending = a[sortBy].localeCompare(b[sortBy])
    return sortOrder === "ascending" ? sortValueAscending : -sortValueAscending;
  })
  return people;
}

const mapStateToProps = (state) => {
  return {
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    people: state.people
      .filter(person => person.role !== 'ROLE_HR' && person.username !== state.user.username)
      .map(person => {
        const newPerson = Object.assign({ name: person.username }, person)
        return newPerson
      })
  }
}


export default connect(mapStateToProps, null)(TableWrapper);
