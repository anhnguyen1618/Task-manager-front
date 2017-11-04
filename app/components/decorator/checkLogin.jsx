import React, { PropTypes, Component } from 'react'
import { browserHistory } from 'react-router';

import { getUser } from '../../redux/taskSelector.js'

export default function(App, param = 'tasks') {
  class SecuredApp extends Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      const user = getUser()
      if (!user) {
        browserHistory.push('/')
        return null
      }

      if (param === 'employee' && user.role !== 'ROLE_HR') {
        browserHistory.push('/')
        return null
      }

      if (param) {
        browserHistory.push(`/${param}`)
      }
    }

    render() {
      return (
        <App/>
      );
    }
  }
  return SecuredApp
}
