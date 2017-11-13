import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Table from "./Table.jsx";

class TableWrapper extends React.Component {
  static propTypes = {
    sortCategory: React.PropTypes.string.isRequired,
    sortOrder: React.PropTypes.string.isRequired,
    people: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }


  render() {
    const { people, sortCategory, sortOrder } = this.props
    const list = sortPeople(people, sortCategory, sortOrder)
    return <div>
                <Table paginatedPeople={list}/>          
            </div>
  }
}
const sortPeople = (people, sortCategory, sortOrder) => {
  /*
    arguments: list of people, sort category, sort order
    return list after being shorted
  */
  people.sort((a, b) => {
    const sortValueAscending = a[sortCategory].localeCompare(b[sortCategory])
    return sortOrder === "ascending" ? sortValueAscending : -sortValueAscending;
  })
  return people;
}

const mapStateToProps = (state) => {
  const { sortCategory, sortOrder, data: people, currentUser } = state.users;
  return {
    sortCategory,
    sortOrder,
    people: people.filter(person => person.userName !== currentUser.userName)
  }
}


export default connect(mapStateToProps, null)(TableWrapper);
