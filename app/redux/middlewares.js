export const promiseFlattenerMiddleWare = ({ dispatch }) => {
  return next => action => {
    if (typeof action.then === 'function') {
      return action.then(dispatch)
    }
    return next(action)
  }
}