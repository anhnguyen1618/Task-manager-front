import React from 'react';
import { connect } from 'react-redux';

import Main from "./Main.jsx";

const Content = (props) => {
  const { sidePaneltriggered } = props
  return (
    <div className={sidePaneltriggered && "content"}>
    	{props.children}
    </div>)
}

const mapStateToProps = (state) => {
  return {
    sidePaneltriggered: state.ui.sidePaneltriggered
  }
}

export default connect(mapStateToProps, null)(Content)
