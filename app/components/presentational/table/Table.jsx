import React from 'react';
import { render } from 'react-dom';
import TableHeader from "../../container/table/TableHeader";
import Row from '../../container/table/Row';
import uuid from "uuid/v4";

const Table = ({ paginatedPeople }) => {
  return (
		<div className="row">
			<table className="table table-striped">
				<TableHeader/>
				<tbody>
					{paginatedPeople.map(man =><Row key={man.userName} man={man}/>) } 
				</tbody>
			</table>
		</div>
	)
}

export default Table;
