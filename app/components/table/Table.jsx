import React from 'react';
import { render } from 'react-dom';
import TableHeader from "./TableHeader.jsx";
import Row from './Row.jsx';
import uuid from "uuid/v4";

const Table = ({ paginatedPeople }) => {
  return <div className="row">
			<table className="table table-striped">
	        	<TableHeader/>
			    <tbody>
				    {paginatedPeople.map(man =><Row key={man.username} man={man}/>) } 
			    </tbody>
		    </table>
	   	</div>
}

export default Table;
