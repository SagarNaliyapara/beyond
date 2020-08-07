import { fork } from 'redux-saga/effects'

import API from '../services/api'
import appSaga from './app-saga'
import authSaga from './auth-saga'



const api = API.core()

// start the daemons
export default function* root() {
	yield fork(appSaga(api).startWatchers)
	yield fork(authSaga(api).startWatchers)
	// yield fork(user.sagas.loginSaga(api).startWatchers)
	// yield fork(user.sagas.passwordSaga(api).startWatchers)
	// yield fork(user.sagas.registerSaga(api).startWatchers)
	// yield fork(user.sagas.userSaga(api).startWatchers)
	// yield fork(job.sagas.JobSaga(api).startWatchers)
	// yield fork(profile.sagas.profileSaga(api).startWatchers)
	// yield fork(serviceman.sagas.communitySaga(api).startWatchers)
	// yield fork(myserviceman.sagas.myServiceMenSaga(api).startWatchers)
	// yield fork(workbook.sagas.iqaSaga(api).startWatchers)
	// yield fork(workbook.sagas.qualificationsSaga(api).startWatchers)
	// yield fork(workbook.sagas.workbookSaga(api).startWatchers)
	// yield fork(video.sagas.videoSaga(api).startWatchers)
	// yield fork(chat.sagas.chatSaga(api).startWatchers)
}
