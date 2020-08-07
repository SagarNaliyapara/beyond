import { delay } from "redux-saga";
import {
  take,
  takeLatest,
  takeEvery,
  put,
  call,
  cancel,
  fork,
  select,
} from "redux-saga/effects";
import { REHYDRATE } from "redux-persist/constants";
// import { Actions as NavigationActions, ActionConst as NavigationType } from 'react-native-router-flux'

import Type from "../actions/type";
import Actions from "../actions/creator";
import { translate } from "../config/lang";

// Listen to various general app actions
const getToken = (state) => state.auth.token;
const getUser = (state) => state.user.data;
const getNotification = (state) => state.app.notification;

export default (api) => {
  function* rehydrationComplete() {
    // TODO not used yet
  }

  function* appStartAttempt() {
    // const token = yield select(getToken)
    // // const user = yield select(getUser)
    // // NOTE purge store if needed
    // // yield put(CoreActions.appResetAttempt())
    // // if (user && !user.activated) {
    // // 	// reset app if user not activated
    // // 	yield put(CoreActions.appResetAttempt())
    // // } else {
    // if (token) {
    // 	api.setAuthToken(token)
    // 	// TODO offline ???
    // 	yield put(UserActions.loginSuccess(token))
    // }
    // yield put(CoreActions.appStartSuccess())
    // }
  }

  function* appStartSuccess() {
    // NOTE DEV navigate where you want on app reload
    // yield call(() => NavigationActions.SettingsMenu())
    // yield call(() => NavigationActions.SettingsPhone())
  }

  function* appResetAttempt() {
    // api.setAuthToken() // Remove auth header from api
    // yield delay(250) // NOTE fake some delay for RNRF actions
    // yield put(Actions.appResetSuccess())
  }

  function* appResetSuccess() {
    // TODO not used yet
  }

  function* setNotification() {
    yield call(delay, 2500);

    const notification = yield select(getNotification);
    if (notification) {
      // reset notification after delay if still present
      yield put(Actions.resetNotification());
    }
  }

  function* resetNotification(action) {
    const notification = yield select(getNotification);
    console.log(
      "notification in resetNotification: ",
      notification,
      action.type
    );
    if (
      notification &&
      (action.type !== Type.SET_NOTIFICATION ||
        action.type !== Type.REACT_NATIVE_ROUTER_FLUX_REFRESH)
    ) {
      // reset notification just before any action unless it's SET_NOTIFICATION
      yield put(CoreActions.resetNotification());
    }
  }

  function* getNotificationsAttempt() {
    // try {
    // 	const response = yield call(api.getNotifications)
    // 	console.log('====================================')
    // 	console.log(JSON.stringify(response))
    // 	console.log('====================================')
    // 	if (
    // 		response.ok &&
    // 		response.data &&
    // 		response.data.status === 'success' &&
    // 		response.data.data &&
    // 		response.data.data.notifications
    // 	) {
    // 		yield put(CoreActions.getNotificationsSuccess(response.data.data.notifications))
    // 	} else {
    // 		yield put(CoreActions.getNotificationsFailure(yield translate('No notifications yet.')))
    // 	}
    // } catch (err) {
    // 	yield put(CoreActions.getNotificationsFailure(err))
    // }
  }

  function* pusherNotificationReveived({ data }) {
    // try {
    // 	const notificationBody = yield call(() => JSON.parse(data.body))
    // 	const notification = { meta: data.meta, body: notificationBody }
    // 	yield put(CoreActions.getNotificationsSuccess([notification]))
    // } catch (err) {
    // 	yield put(CoreActions.getNotificationsFailure(err))
    // }
  }

  function* getCities() {
    try {
      const response = yield call(api.getCities);
      if (
        response &&
        response.ok &&
        response.data 
      ) {
        yield put(Actions.getCitiesSuccess(response.data.cities));
      } else {
        yield put(Actions.getCitiesFailure("INVALID_INFORMATION"));
      }
      // alert(JSON.stringify(response))
    } catch (err) {
      yield put(Actions.getCitiesFailure("err"));
    }
  }

  function* getVoiceMessages() {
    try {
      const response = yield call(api.getVoiceMessages);
      // alert(JSON.stringify(response.data))
      if (response && response.ok && response.data) {
        yield put(Actions.getVoiceMessagesSuccess(response.data));
      } else {
        yield put(Actions.getVoiceMessagesFailure("INVALID_INFORMATION"));
      }
    } catch (err) {
      yield put(Actions.getVoiceMessagesFailure("err"));
    }
  }
  function* getMessages(action) {
    // alert(action.user_id)
    try {
      const response = yield call(api.getMessages, action.user_id);

      if (response && response.ok && response.data) {
        yield put(Actions.getMessagesSuccess(response.data.messages));
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* sendMessages(action) {
    // alert(JSON.stringify(action))
    try {
      const response = yield call(
        api.sendMessage,
        action.receiver_id,
        action.sender_id,
        action.message
      );
      // alert(JSON.stringify(response))
      if (response && response.ok && response.data) {
        yield put(Actions.getMessagesAttempt(action.user_id));
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getPackageFeatures() {
    // alert(action.user_id)
    try {
      const response = yield call(api.getPackageFeatures);

      if (
        response &&
        response.ok &&
        response.data &&
        response.data.success &&
        response.data.success.package_features
      ) {
        yield put(
          Actions.getPackageFeaturesSuccess(
            response.data.success.package_features
          )
        );
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getPlansFeatures() {
    try {
      const response = yield call(api.getPlansFeatures);
      if (
        response &&
        response.ok &&
        response.data &&
        response.data.success &&
        response.data.success.package_plans
      ) {
        yield put(
          Actions.getPackagePlansSuccess(response.data.success.package_plans)
        );
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getPackageDurations() {
    // alert(action.user_id)
    try {
      const response = yield call(api.getPackageDurations);
      if (
        response &&
        response.ok &&
        response.data &&
        response.data.success &&
        response.data.success.package_durations
      ) {
        yield put(
          Actions.getPackageDurationsSuccess(
            response.data.success.package_durations
          )
        );
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getSavePlansFeatures(action) {
    try {
      // alert(action.plan_id+" n "+ action.user_id +" n "+action.coupon_id)
      const response = yield call(
        api.savePlansFeatures,
        action.plan_id,
        action.user_id,
        ""
      );

      if (
        response &&
        response.ok &&
        response.data &&
        response.data.success &&
        response.data.success
      ) {
        // alert(response.data.success);
        yield put(Actions.showPaymentWebView(true))


        // yield put(Actions.getSavePlansAttempt( response.data.success.package_plans))
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getTripCreate(action) {
    try {
      const response = yield call(api.getTripCreate, action.trip);
      // alert(response.data.success);

      if (response && response.ok && response.data) {
        alert(response.data.success);
        // yield put(Actions.tripCreateAttempt(trip))
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getAppointmentCreate(action) {
    try {
      const response = yield call(api.getAppointmentCreate, action.appointment);

      if (response && response.ok && response.data) {
        alert(JSON.stringify(response.data));
        // yield put(Actions.tripCreateAttempt(trip))
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getSocialEventCreate(action) {
    try {
      const response = yield call(api.getSocialEventCreate, action.socialEvent);

      if (response && response.ok && response.data) {
        alert(JSON.stringify(response.data.success));
        // yield put(Actions.tripCreateAttempt(trip))
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getMettingsCreate(action) {
    try {
      const response = yield call(api.mettingsCreate, action.mettings);

      if (response && response.ok && response.data) {
        alert(JSON.stringify(response.data));
        // yield put(Actions.tripCreateAttempt(trip))
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getSocialServiceCreate(action) {
    try {
      const response = yield call(
        api.socialServiceCreate,
        action.socialService
      );

      if (response && response.ok && response.data) {
        alert(JSON.stringify(response.data));

        // yield put(Actions.tripCreateAttempt(trip))
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getHotelBookingCreate(action) {
    try {
      const response = yield call(api.hotelBookingCreate, action.hotelBooking);

      if (response && response.ok && response.data) {
        alert(JSON.stringify(response.data));

        // yield put(Actions.tripCreateAttempt(trip))
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }
  function* getTripsData(action) {
    // alert(JSON.stringify(action.tripData))
    try {
      const response = yield call(api.getTripsData, action.tripData);
      // alert(JSON.stringify(response.data.trips))

      if (response && response.ok && response.data) {
        yield put(Actions.getTripsSuccess(response.data.trips));
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getHotelData(action) {
    // alert(JSON.stringify(action.tripData))
    try {
      const response = yield call(api.getHotelsData, action.hotelData);
      // alert(JSON.stringify(response.data.trips))

      if (response && response.ok && response.data) {
        yield put(Actions.getHotelSuccess(response.data.hotels));
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getSecondaryServiceData(action) {
    try {
      const response = yield call(
        api.getSecondaryServiceData,
        action.secondaryData
      );
      // alert(JSON.stringify(response.data.social_services))

      if (response && response.ok && response.data) {
        yield put(
          Actions.getSecondaryServiceSuccess(response.data.social_services)
        );
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }
  // alert(JSON.stringify(response.data.social_services));

 
 
 
 
  function* getMettingsData(action) {
    // alert(JSON.stringify(action.tripData))
    try {
      const response = yield call(api.getMettingsData, action.mettingData);
      // alert(JSON.stringify(response.data.trips))

      if (response && response.ok && response.data) {
        yield put(Actions.getMettingsSuccess(response.data.meetings));
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* getSocialEventsData(action) {
    // alert(JSON.stringify(action.tripData))
    try {
      const response = yield call(api.getSocialEventsData, action.socialData);
      // alert(JSON.stringify(response.data.social_events))

      if (response && response.ok && response.data) {
        yield put(Actions.getSocialEventsSuccess(response.data.social_events));
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }


  function* getCalenderData(action) {
    // alert(JSON.stringify(action.calenderData))
    try {
      const response = yield call(api.getCalenderData, action.calenderData);
      // alert(JSON.stringify(response.data.appointments))

      if (response && response.ok && response.data) {
        yield put(Actions.getCalenderSuccess(response.data.appointments));
      }
    } catch (err) {
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* addNewContact(action) {
    try {
      const response = yield call(api.addContact, action.contact);
      if (response && response.ok && response.data) {
        yield put(Actions.getNewContact(action.contact.user_id));
        alert(response.data.message)
        // alert(action.contact.user_id)
      
      }
    } catch (err) {
      alert(err)
      // yield put(Actions.getMessagesFailure("err"))
    }
  }


  function* getContacts(action) {
    try {
      const response = yield call(api.getContacts,action.user_id);
      if (response && response.ok && response.data) {
        yield put(Actions.getContactsSuccess(response.data));
      }
    } catch (err) {
      alert(err)
      // yield put(Actions.getMessagesFailure("err"))
    }
  }

  function* deletContacts(action) {
    
  
    try {
      const response = yield call(api.deletContacts,action.id);

      if (response && response.ok && response.data) {
        yield put(Actions.getNewContact(action.user_id));
        alert(JSON.stringify(response.data.message))
      }
    } catch (err) {
      alert(err)
      // yield put(Actions.getMessagesFailure("err"))
    }
  }
  
  







  // The Main Watcher function
  function* startWatchers() {
    yield fork(takeEvery, REHYDRATE, rehydrationComplete);
    // Notifications
    yield fork(takeLatest, Type.SET_NOTIFICATION, setNotification);
    // yield fork(takeEvery, Type.GET_NOTIFICATIONS_ATTEMPT, getNotificationsAttempt)
    // yield fork(takeEvery, Type.PUSHER_NOTIFICATION_RECEIVED, pusherNotificationReveived)
    // // yield fork(takeLatest, '*', resetNotification)
    yield fork(takeLatest, Type.RESET_NOTIFICATION, resetNotification);
    // // App startup
    const startup = yield fork(
      appStartAttempt,
      yield take(Type.APP_START_ATTEMPT)
    );
    yield fork(takeEvery, Type.APP_START_SUCCESS, appStartSuccess);
    yield fork(takeEvery, Type.APP_RESET_ATTEMPT, appResetAttempt);
    yield fork(takeEvery, Type.APP_RESET_SUCCESS, appResetSuccess);

    yield fork(takeEvery, Type.GET_CITIES_ATTEMPT, getCities);
    yield fork(takeEvery, Type.GET_VOICE_MESSAGES_ATTEMPT, getVoiceMessages);
    yield fork(takeEvery, Type.GET_MESSAGES_ATTEMPT, getMessages);
    yield fork(takeEvery, Type.SEND_MESSAGES_ATTEMPT, sendMessages);
    yield fork(
      takeEvery,
      Type.GET_PACKAGE_FEATURES_ATTEMPT,
      getPackageFeatures
    );
    yield fork(takeEvery, Type.GET_PACKAGE_PLANS_ATTEMPT, getPlansFeatures);
    yield fork(
      takeEvery,
      Type.GET_PACKAGE_DURATIONS_ATTEMPT,
      getPackageDurations
    );
    yield fork(takeEvery, Type.GET_SAVE_PLANS_ATTEMPT, getSavePlansFeatures);
    yield fork(takeEvery, Type.TRIP_CREATE_ATTEMPT, getTripCreate);
    yield fork(
      takeEvery,
      Type.APPOINTMENT_CREATE_ATTEMPT,
      getAppointmentCreate
    );
    yield fork(
      takeEvery,
      Type.SOCIALEVENT_CREATE_ATTEMPT,
      getSocialEventCreate
    );
    yield fork(takeEvery, Type.MEETINGS_CREATE_ATTEMPT, getMettingsCreate);
    yield fork(
      takeEvery,
      Type.SOCIALSERVICE_CREATE_ATTEMPT,
      getSocialServiceCreate
    );
    yield fork(
      takeEvery,
      Type.HOTELBOOKING_CREATE_ATTEMPT,
      getHotelBookingCreate
    );
    yield fork(takeEvery, Type.GET_TRIPS_ATTEMPT, getTripsData);
    yield fork(takeEvery, Type.GET_SOCIALEVENTS_ATTEMPT, getSocialEventsData);
    yield fork(takeEvery, Type.GET_METTINGS_ATTEMPT, getMettingsData);
    yield fork(takeEvery, Type.GET_HOTEL_ATTEMPT, getHotelData);
    yield fork(
      takeEvery,
      Type.GET_SECONDARY_SERVICE_ATTEMPT,
      getSecondaryServiceData
    );
    yield fork(takeEvery, Type.GET_CALENDER_ATTEMPT, getCalenderData);
    yield fork(takeEvery, Type.ADD_NEW_CONTACT,addNewContact);
    yield fork(takeEvery, Type.GET_NEW_CONTACTS, getContacts);
    yield fork(takeEvery, Type.DELETE_CONTACTS, deletContacts);

    // // wait for the user to be logged out if needed
    yield take(Type.APP_RESET_ATTEMPT);
    yield cancel(startup);
  }

  return {
    startWatchers,
  };
};
