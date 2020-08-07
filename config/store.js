import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import { REHYDRATE } from 'redux-persist/constants'
import createActionBuffer from 'redux-action-buffer'

import createSagaMiddleware from 'redux-saga'

import sagas from '../saga'
import DebugSettings from './debug-settings'
import ReduxPersistService from '../services/redux-persist-service'
import rootReducer from '../reducer'

const sagaMiddleware = createSagaMiddleware()

const middleware = []
middleware.push(sagaMiddleware)
middleware.push(createActionBuffer(REHYDRATE))

const composeEnhancers =
	__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// actionsBlacklist: ['redux-form/*'],
		})
		: compose
if (__DEV__) {
	GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
}
// a function which can create our store and auto-persist the data
function* testSaga() {
	console.log("this is test saga")
}
export default () => {
	// if (__DEV__) {
	// 	enhancers = composeEnhancers(
	// 		autoRehydrate(),
	// 		applyMiddleware(...middleware),
	// 	)
	// } else {
	const enhancers = composeEnhancers(autoRehydrate(), applyMiddleware(...middleware))
	// }

	const store = createStore(rootReducer, enhancers)

	sagaMiddleware.run(sagas)
	ReduxPersistService.updateReducers(store)

	if (__DEV__ && module.hot) {
		// Enable hot module replacement for reducers

		module.hot.accept(() => {
			const nextRootReducer = require('../reducer/index').default
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}
