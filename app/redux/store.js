import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import { promiseFlattenerMiddleWare } from './middlewares'
import users from './reducers/users'
import ui from './reducers/ui'
import tasks from './reducers/tasks'

const reducer = combineReducers({
  form: formReducer,
  tasks,
  users,
  ui,
  routing: routerReducer
})

const store = createStore(
  reducer,
  compose(
    applyMiddleware(promiseFlattenerMiddleWare),
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store
