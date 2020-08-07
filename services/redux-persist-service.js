import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'

import ReduxPersistSettings from '../config/persistence/redux-persist-settings'
import CoreActions from '../actions/creator'

const updateReducers = (store) => {
	const reducerVersion = ReduxPersistSettings.reducerVersion
	const config = ReduxPersistSettings.storeConfig
	const startup = () => store.dispatch(CoreActions.appStartAttempt())

	AsyncStorage.getItem('poaw.reducerVersion').then((localVersion) => {
		if (localVersion !== reducerVersion) {
            // TODO Purge store
			persistStore(store, config, startup).purge()
			AsyncStorage.setItem('poaw.reducerVersion', reducerVersion)
		} else {
			persistStore(store, config, startup)
		}
	}).catch(() => {
		persistStore(store, config, startup)
		AsyncStorage.setItem('poaw.reducerVersion', reducerVersion)
	})
}

export default { updateReducers }
