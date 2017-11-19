import React from 'react';
import { render } from 'react-dom';

const Box = (props) => {
  return <td >
            {props.isEdited ? <Input {...props}/>: 
                <span onClick={props.onEdit(props.type)}>
                    {props.value}
                </span> 
            }
            </td>
}

const Input = ({ isFocused, type, value, updateInfo }) => {
  const shouldFocus = isFocused === type;
  if (type !== 'role') {
    return <input 
                type={type === "email" ? "mail" : "text"} 
                autoFocus={shouldFocus}
                disabled={type === "name"} 
                onChange={updateInfo} 
                defaultValue={value} 
                className="form-control"    
            />
  }
  return <select 
                className="form-control" 
                autoFocus={shouldFocus} 
                onChange={updateInfo} 
                defaultValue={value}>
                    <option>ADMIN</option>
                    <option>USER</option>                     
         </select>
}

Input.propTypes = {
  type: React.PropTypes.string.isRequired,
  isFocused: React.PropTypes.string.isRequired,
  updateInfo: React.PropTypes.func.isRequired,
};



export default Box;
