import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import id_generator from "uuid/v4";
import classNames from 'classnames';

import { updatePeople, deletePeople } from '../../../redux/api.js'
import { updatePeopleAction } from '../../../redux/actions.js'

import Box from '../../presentational/table/Box.jsx'

export class Row extends React.Component {

  constructor(props) {
    super(props);
    this.state = {...this.props.man, isEdited: false, isFocused: null};
    const { userName, email, role } = this.props.man;
    this.infoObj = { userName, email, role };
  }

  render() {
    const { isEdited, userName, email, role, isFocused } = this.state
    const passProps = { onEdit: this.onEdit, isEdited, isFocused }
    const infos = [{ type: "userName", value: userName }, { type: "email", value: email }, { type: "role", value: role }]
    const editIconStyle = classNames({'glyphicon': true, 'glyphicon-pencil': true, 'isEdited': isEdited})

    return (
      <tr>
        {infos.map((info, index) => <Box key={index} {...info} {...passProps} updateInfo={this.updateInfo(info.type)}/>)}
        <td id="editor">
          <div>
            <span onClick={this.onEdit("userName")} className={editIconStyle}/>
            <span onClick={() => this.props.deletePeople(userName)} className="glyphicon glyphicon-remove"/>  
          </div>      
        </td>
      </tr>
    );
  }

  onEdit = (isFocused) => (e) => {
    if (this.state.isEdited) {
      //    Finish updating entry and save changes 
      this.setState(Object.assign({}, this.state, this.infoObj, { isEdited: false }));
      this.props.updatePeople(this.infoObj);
    } else {
      // render input fields when switching to edit mode, focus on the input that is clicked
      const { userName, email, role } = this.state;
      this.infoObj = { userName, email, role };
      this.setState(Object.assign({}, this.state, { isEdited: true, isFocused }));
    }
  }

  updateInfo = (type) => (e) => {
    //dynamically change information object when the values from child inputs change
    this.infoObj[type] = e.target.value;
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePeople: (userName) => dispatch(deletePeople(userName)),
    updatePeople: (payload) => dispatch(updatePeople(payload))
  }
}

Row.propTypes = {
  man: React.PropTypes.object.isRequired,
  deletePeople: React.PropTypes.func.isRequired,
  updatePeople: React.PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Row);
