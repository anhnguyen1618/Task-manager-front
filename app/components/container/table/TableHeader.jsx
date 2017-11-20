import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

const TableHeader = (props) => {
  const { sort, sortCategory, sortOrder } = props;
  return (
    <thead>
      <tr>
        {["UserName", "Email", "Role"].map((title)=>(
          <th key={title} className={title === 'Role' ? "col-md-2": 'col-md-4'}>                        
            <span className="title" onClick={sort(sortCategory, sortOrder, title)}>{title}</span>    
            { title.toLowerCase() === sortCategory.toLowerCase()
              ? <span className={"glyphicon glyphicon-sort-by-attributes"+(sortOrder === "descending" ? "-alt" : "")}/>
              : <span className="glyphicon glyphicon-align-left"></span>}                                    
          </th>)
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
    sort: (currentSortBy, currentSortOrder, newCategory) => (e) => {
      let sortCategory = newCategory.toLowerCase();

      if (sortCategory == 'username') {
        sortCategory = 'userName';
      }

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
