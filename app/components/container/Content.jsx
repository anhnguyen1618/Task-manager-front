import React from 'react';
import { connect } from 'react-redux';

import Main from "../presentational/Main.jsx";

const Content = (props) => {
  const { sidePaneltriggered } = props
  return (
    <div className={sidePaneltriggered && "content"}>
    	{props.children}
    </div>)
}

const mapStateToProps = (state) => {
  return {
    sidePaneltriggered: state.sidePaneltriggered
  }
}

export default connect(mapStateToProps, null)(Content)
