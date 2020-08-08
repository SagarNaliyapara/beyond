import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

import Type from '../actions/type'
import reactotron from 'reactotron-react-native';
// import UserActionsType from '../../user/actions/type'

export const INITIAL_STATE = Immutable({
	loaded: false,
	notification: null,
	counts: null,
	notifications: null,
	gettingNotifications: false,
	locale: 'en',
	isLoadedVideo: true,
	cites: [],
	voiceMessages: null,
	messages: [],
	sendMessage: [],
	package_features: [],
	package_plans: [],
	package_durations: [],
	tripsData: [],
	calendarData: [],
	socialsData: [],
	mettingsData: [],
	hotelsData: [],
	secondaryServiceData: [],
	contactsData: [],
	shoPaymentWebView: false,
	homeScreenMessage: ""

})

const showPaymentWebView = (state, action) => {
	return state.merge({ shoPaymentWebView: action.value })
}

const saveNewContacts = (state, action) => {
	// alert(JSON.stringify(action.contactsData))
	return state.merge({ contactsData: action.contactsData })
}
// const addNewContact = (state, action) => {
// 	console.log("New contact ====== ", action.contact)
// 	let oldcontacts = [...state.contacts]
// 	oldcontacts.push(action.contact)
// 	return {...state,contacts:  oldcontacts }
// 	// return state.merge({ contacts: action.contact })
// }

// const getCitesAttemp = state => state.merge({ loaded: true, notification: null })
const getVoiceMessagesSuccess = (state, action) => {
	// return {...state,voiceMessages: action.voiceMessages }
	// alert(JSON.stringify(action.voiceMessages))
	return state.merge({ voiceMessages: action.voiceMessages })
}
const getMessagesSuccess = (state, action) => {
	// alert(JSON.stringify( action.messages))
	let reverseArray = [];
	if (action.messages && action.messages.length > 0) {
		reverseArray = action.messages.reverse()
	}
	return { ...state, messages: reverseArray }
}
const sendMessagesSuccess = (state, action) => {
	// alert(JSON.stringify(action ))
	// return {...state,sendMessage: action.messages }
}

const getCitiesSuccess = (state, action) => {
	return state.merge({ cites: action.cites })
}
const getTripsData = (state, action) => {
	return state.merge({ tripsData: action.tripsData })
}

const setTripsDataEmpty = (state, action) => {
	return state.merge({ requestData: [] })
}

const getSecondaryServiceData = (state, action) => {
	return state.merge({ secondaryServiceData: action.secondaryServiceData })
}
const getHotelsData = (state, action) => {
	return state.merge({ hotelsData: action.hotelsData })
}
const getMettingsData = (state, action) => {
	return state.merge({ mettingsData: action.mettingsData })
}
const getSocialEventsData = (state, action) => {
	return state.merge({ socialsData: action.socialsData })
}
const getCalenderData = (state, action) => {
	// alert(JSON.stringify(action.calendersData))
	return state.merge({ calendarData: action.calendersData })
}


const getPackageFeaturesSuccess = (state, action) => {
	return state.merge({ package_features: action.package_features })
}
const getPlansFeaturesSuccess = (state, action) => {
	return state.merge({ package_plans: action.package_plans })
}
const getPackageDurationsSuccess = (state, action) => {
	return state.merge({ package_durations: action.package_durations })
}

const appStartAttempt = state => state.merge({ loaded: false, notification: null })

const appStartSuccess = state => state.merge({ loaded: true, notification: null })

const appResetAttempt = state => state.merge({ ...INITIAL_STATE, locale: state.locale })

const appResetSuccess = state => state.merge({ loaded: true, notification: null })

const setNotification = (state, action) =>
	state.merge({ notification: { type: action.notificationType, message: action.message } })
const setLoadedVideo = (state, action) => state.merge({ isLoadedVideo: action.isLoadedVideo })

const resetNotification = state => state.merge({ notification: null })

const setInitialCounts = (state, { user: { notifications_counts } }) =>
	state.set('counts', notifications_counts)

const getNotificationsAttempt = state => state.set('gettingNotifications', true)
const getNotificationsFailure = state => state.set('gettingNotifications', false)
const getNotificationsSuccess = (state, { notifications }) =>
	state.merge({
		notifications: (state.notifications || []).concat(notifications),
		gettingNotifications: false,
	})

const setLanguage = (state, { locale }) => state.merge({ locale })
const signout = state => state.merge({ ...INITIAL_STATE })


const getHomeScreenTextRequest = state => state.merge({ loaded: true, })

const getHomeScreenTextRequestSuccess = (state, action) => {
	state.merge({
		homeScreenMessage: action.value
	})
}

const getHomeScreenTextRequestFailure = state => {

}

// map our types to our handlers
const ACTION_HANDLERS = {
	// [Type.ADD_NEW_CONTACT]:addNewContact,
	[Type.GET_NEW_CONTACTS_SUCCESS]: saveNewContacts,
	[Type.GET_MESSAGES_SUCCESS]: getMessagesSuccess,
	[Type.SEND_MESSAGES_SUCCESS]: sendMessagesSuccess,
	[Type.GET_VOICE_MESSAGES_SUCCESS]: getVoiceMessagesSuccess,
	[Type.GET_CITIES_ATTEMPT]: getCitiesSuccess,
	[Type.APP_START_ATTEMPT]: appStartAttempt,
	[Type.APP_START_SUCCESS]: appStartSuccess,
	[Type.APP_RESET_ATTEMPT]: appResetAttempt,
	[Type.APP_RESET_SUCCESS]: appResetSuccess,
	[Type.APP_SET_LOADED_VIDEO]: setLoadedVideo,
	[Type.GET_PACKAGE_FEATURES_SUCCESS]: getPackageFeaturesSuccess,
	[Type.GET_PACKAGE_PLANS_SUCCESS]: getPlansFeaturesSuccess,
	[Type.GET_PACKAGE_DURATIONS_SUCCESS]: getPackageDurationsSuccess,

	[Type.SET_NOTIFICATION]: setNotification,
	[Type.RESET_NOTIFICATION]: resetNotification,

	// [UserActionsType.GET_USER_SUCCESS]: setInitialCounts,
	[Type.GET_NOTIFICATIONS_FAILURE]: getNotificationsFailure,
	[Type.GET_NOTIFICATIONS_SUCCESS]: getNotificationsSuccess,
	[Type.GET_NOTIFICATIONS_ATTEMPT]: getNotificationsAttempt,
	// General
	[Type.SET_LANGUAGE]: setLanguage,

	[Type.SIGNOUT]: signout,
	[Type.GET_TRIPS_SUCCESS]: getTripsData,
	[Type.GET_TRIPS_ATTEMPT]: setTripsDataEmpty,
	[Type.GET_SOCIALEVENTS_SUCCESS]: getSocialEventsData,
	[Type.GET_METTINGS_SUCCESS]: getMettingsData,
	[Type.GET_HOTEL_SUCCESS]: getHotelsData,
	[Type.GET_SECONDARY_SERVICE_SUCCESS]: getSecondaryServiceData,
	[Type.GET_CALENDER_SUCCESS]: getCalenderData,
	[Type.SHOW_PAYMENT_VIEW]: showPaymentWebView,

	[Type.GET_HOME_SCREEN_TEXT_REQUEST]: getHomeScreenTextRequest,
	[Type.GET_HOME_SCREEN_TEXT_REQUEST_SUCCESS]: getHomeScreenTextRequestSuccess,
	[Type.GET_HOME_SCREEN_TEXT_REQUEST_FAILURE]: getHomeScreenTextRequestFailure,

}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
