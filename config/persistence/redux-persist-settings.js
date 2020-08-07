import { AsyncStorage } from 'react-native'

import immutablePersistenceTransform from './immutable-persistence-transform'
import { persistentStoreWhitelist } from '../../reducer/'

const REDUX_PERSIST = {
	active: true,
	reducerVersion: '1',
	storeConfig: {
		storage: AsyncStorage,
		// blacklist: ['app'], // reducer keys that you do NOT want stored to persistence here
		whitelist: persistentStoreWhitelist,
		transforms: [immutablePersistenceTransform],
	},
}

export default REDUX_PERSIST
