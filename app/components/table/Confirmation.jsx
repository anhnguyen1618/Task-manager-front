import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { deletePeople } from '../../redux/api.js'
import { deletePeopleAction } from '../../redux/actions.js'

const Confirmation = (props) => {
  return <Modal show={props.show} onHide={props.hide} >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title">Remove person</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove this entry?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.hide}>CANCEL</Button>
                    <Button bsStyle="primary" onClick={props.confirm(props.idOfDeleteEntry)}>YES</Button>
                </Modal.Footer>
            </Modal>
}

Confirmation.propTypes = {
  show: React.PropTypes.bool.isRequired,
  idOfDeleteEntry: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  hide: React.PropTypes.func.isRequired,
  confirm: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    show: state.showConfirm,
    idOfDeleteEntry: state.idOfDeleteEntry,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hide: () => dispatch({ type: "HIDE_CONFIRM" }),
    confirm: (id) => () => {
      deletePeople(id)
        .then(res => {
          dispatch(deletePeopleAction({ username: id }))
          dispatch({ type: "HIDE_CONFIRM" })
        })
        .catch(err => {
          alert("Cannot delete!")
        })

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
