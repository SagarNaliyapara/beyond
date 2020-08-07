import { combineReducers } from 'redux'

import appReducer from './app-reducer'
import authReducer from './auth-reducer'
// glue all the reducers together into 1 root reducer
export default combineReducers({
	app: appReducer,
	auth: authReducer
})

// OR put reducer keys that you DO want stored to persistence here (overrides blacklist)
export const persistentStoreWhitelist = ['auth']
