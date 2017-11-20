import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from "react-redux";
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import store from "../redux/store";
import { checkUser } from "../redux/api.js";
import checkLogin from "./decorator/checkLogin.jsx"
import Login from './container/LoginContainer.jsx'
import Content from "./container/Content.jsx"
import Main from "./container/Main.jsx";

import SidePanel from "./container/SidePanel.jsx";
import SideModal from './container/SidePanel-modal.jsx';
import Table from './container/table/Staff.jsx';
import Loader from './presentational/Loader.jsx'

const App = () => {
  return (
    <Provider store = {store}>
    	<SecuredApp/>
  	</Provider>
  )
}

const Theme = ({ children }) => {
  return (
    <div className="container-fluid">
			{children}
		</div>
  )
}

const MainPage = () => {
  return (
    <div>
			<Content>
	    	<Main/>
    	</Content>
    	<SidePanel>
    		<SideModal/>
    	</SidePanel>
	</div>
  )
}

export class SecureApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    const { fetchCurrentUser } = this.props
    fetchCurrentUser()
      .then(res => {
        this.setState({ isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      })
  }

  render() {
    if (this.state.isLoading) {
      return <div className="screen">
      		<center><img src="http://i.imgur.com/DLBS6e5.gif"/></center>
      	</div>
    }
    return (
      <Router history = { syncHistoryWithStore(browserHistory, store) }>
  			<Route path="/" component={Theme}>
  				<IndexRoute component={checkLogin(Login)}/>
  				<Route path="tasks" component={checkLogin(MainPage)}/>
  				<Route path="employee" component={checkLogin(Table,'employee')}/>
  			</Route>
  		</Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser: () => dispatch(checkUser())
  }
}

const SecuredApp = connect(null, mapDispatchToProps)(SecureApp)


export default App
