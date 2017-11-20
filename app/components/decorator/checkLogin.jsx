import React, { PropTypes, Component } from 'react'
import { browserHistory } from 'react-router';

import { getCurrentUser } from '../../redux/selectors/users'

export default function(App, param = 'tasks') {
  class SecuredApp extends Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      const user = getCurrentUser()
      if (!user) {
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
