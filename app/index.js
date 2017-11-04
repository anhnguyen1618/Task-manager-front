import React from 'react';
import { render } from 'react-dom';
import './Scss/Styles.scss';
import './Scss/Main-page.scss';
import './Scss/Panel.scss';
import './Scss/table-style.scss';

import { Provider } from "react-redux";
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
injectTapEventPlugin();
render(
  <App/>,
  document.getElementById('app'));
