import React, { PropTypes, Component } from 'react'

export default function(WrappedPanel) {
  class KeyStrokeSupport extends Component {
    constructor(props) {
      super(props);
      this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentWillMount() {
      document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
      document.addEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown(e) {
      switch (e.keyCode) {
        case 27:
          this.props.hideSidePanel()
          break
      }
    }

    render() {
      const { sidePaneltriggered, hideSidePanel } = this.props
      return (
        <div>
        	<div className={sidePaneltriggered && "tint-layer"} onClick={hideSidePanel}></div>
        	<WrappedPanel {...this.props}/>
        </div>
      );
    }
  }
  
  KeyStrokeSupport.displayName = "KeyStrokeSupport"
  KeyStrokeSupport.propTypes = {
    hideSidePanel: PropTypes.func.isRequired
  }

  return KeyStrokeSupport

}
