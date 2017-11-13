import React from 'react';
import { connect } from 'react-redux';
import uuid from "uuid/v4";
import { Link } from 'react-router';

import { createPeople } from '../../redux/api.js'
import { addPeople } from '../../redux/actions.js'


class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = { userName: "", email: "", role: "ROLE_ADMIN", password: "" };
  }

  render() {
    const { userName, email, role, password } = this.state;
    return (
      <div className="row">
            <Link to={'/tasks'} className="btn btn-primary"> Back to main page!</Link>
            <h1>Add employee</h1>
            <form >
                <div className="row">
                    <div className="col-xs-3">
                        <input type="text" className="form-control" placeholder="Name" value={userName} onChange={this.updateForm("userName")}/>
                    </div>
                    
                    <div className="col-xs-3">
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={this.updateForm("password")}/>
                    </div>

                    <div className="col-xs-3">
                        <input type="mail" className="form-control" placeholder="Email" value={email} onChange={this.updateForm("email")}/>

                    </div>
                    
                    <div className="col-xs-2">
                        <select className="form-control" value={role} onChange={this.updateForm("role")}>
                            <option>ADMIN</option>
                            <option>USER</option>                     
                        </select>
                    </div>
                    
                    <div className="col-xs-1">
                        <button type="button" className="btn btn-success" onClick={()=>this.submit()}>
                            <span className="glyphicon glyphicon-plus"></span>
                        </button>
                    </div>      
                </div>              
            </form>
        </div>

    );
  }
  updateForm = key => e => {
    const newObj = {};
    newObj[key] = e.target.value;
    this.setState(Object.assign({}, this.state, newObj));
  }

  submit = () => {
    const {userName, password, email} = this.state
    if (userName !== "" && password !== "" && /^\w+@\w+\.\w+$/.test(email)) {
      //
      const newPerson = Object.assign({}, this.state)

      this.props.addPerson(newPerson)
        .then(res => {
          alert("Add person successfully!");
        })
        .catch(err => {
          console.log(err)
          alert("Your data is invalid")
        })

      this.setState({ userName: "", email: "", role: "ADMIN", password: "" });
    } else {
      alert("Your from is invalid!");
    }
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addPerson: (payload) => dispatch(createPeople(payload))
  }
}
export default connect(null, mapDispatchToProps)(Form);
