import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import addKeyStoke from '../decorator/key-stroke-decorator.jsx';

const SidePanel = (props) => {
  const { sidePaneltriggered } = props
  const PanelClass = classNames({
    'sidePanel': true,
    'shown': sidePaneltriggered
  })

  return (
    <div className={PanelClass}>
    	{sidePaneltriggered && props.children}
	</div>
  )
}

const mapStateToProps = (state) => {
  return {
    sidePaneltriggered: state.ui.sidePaneltriggered
  };
}

const mapDispatchToProps = dispatch => {
  return {
    hideSidePanel: () => dispatch({ type: 'HIDE_SIDE_PANEL' })
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addKeyStoke(SidePanel))
