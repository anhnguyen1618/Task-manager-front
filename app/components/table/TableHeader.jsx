import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

const TableHeader = (props) => {
  const { sort, sortCategory, sortOrder } = props;
  return (
    <thead>
      <tr>
          {["Name", "Email", "role"].map((title)=>(
            <th key={title} className={title === 'role' ? "col-md-2": 'col-md-4'}>                        
                <span className="title" onClick={sort(sortCategory, sortOrder)}>{title}</span>    
                { title.toLowerCase() === sortCategory
                  ? <span className={"glyphicon glyphicon-sort-by-attributes"+(sortOrder === "descending" ? "-alt" : "")}/>
                  : <span className="glyphicon glyphicon-align-left"></span>}                                    
            </th>
            )
          )}
          <th className="col-md-2" id="edit"></th>
      </tr>
    </thead>)
}

TableHeader.propTypes = {
  sortCategory: React.PropTypes.string.isRequired,
  sortOrder: React.PropTypes.string.isRequired,
  sort: React.PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  const { sortCategory, sortOrder } = state.users;
  return {
    sortCategory,
    sortOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sort: (currentSortBy, currentSortOrder) => (e) => {
      const sortCategory = e.target.innerHTML.toLowerCase();
      if (sortCategory !== currentSortBy) {
        dispatch({ type: "CHANGE_SORT_CATEGORY", sortCategory });
      } else {
        /*Reverse the order of the list when users click on the current sorted category*/
        dispatch({ type: "CHANGE_SORT_ORDER", sortOrder: (currentSortOrder === "ascending" ? "descending" : "ascending") });
      }
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);
