import Type from "./type";
const appStartAttempt = () => ({ type: Type.APP_START_ATTEMPT });
const appStartSuccess = () => ({ type: Type.APP_START_SUCCESS });
const appResetAttempt = (userId) => ({ type: Type.APP_RESET_ATTEMPT, userId });
const appResetSuccess = () => ({ type: Type.APP_RESET_SUCCESS });

const setNotification = (notificationType, message) => ({
  type: Type.SET_NOTIFICATION,
  notificationType,
  message,
});
const resetNotification = () => ({ type: Type.RESET_NOTIFICATION });

const getNotificationsAttempt = () => ({
  type: Type.GET_NOTIFICATIONS_ATTEMPT,
});
const getNotificationsSuccess = (notifications) => ({
  type: Type.GET_NOTIFICATIONS_SUCCESS,
  notifications,
});
const getContactsSuccess = (contactsData) => ({
  type: Type.GET_NEW_CONTACTS_SUCCESS,
  contactsData,
});
const getNotificationsFailure = (error) => ({
  type: Type.GET_NOTIFICATIONS_ATTEMPT,
  error,
});

const toggleDrawer = (open) => ({ type: Type.TOGGLE_DRAWER, open });
const setCurrentTab = (key) => ({ type: Type.SET_CURRENT_TAB, key });
const setCurrentScene = (key) => ({ type: NavigationType.FOCUS, key });

const pusherNotificationReveived = (action) => ({
  type: Type.PUSHER_NOTIFICATION_RECEIVED,
  action,
});

const setLoadedVideo = (isLoadedVideo) => ({
  type: Type.APP_SET_LOADED_VIDEO,
  isLoadedVideo,
});

const setLanguage = (locale) => ({ type: Type.SET_LANGUAGE, locale });

const addNewContact = (contact) => ({ type: Type.ADD_NEW_CONTACT, contact });
const getNewContact = (user_id) => ({ type: Type.GET_NEW_CONTACTS, user_id });
const deleteContact = (id, user_id) => ({ type: Type.DELETE_CONTACTS, id, user_id });

const loginAttempt = (user) => ({ type: Type.LOGIN_ATTEMPT, user });
const loginSuccess = (
  token,
  name,
  secretary_id,
  user_id,
  subscription,
  userType,
  user
) => ({
  type: Type.LOGIN_SUCCESS,
  token: token,
  name: name,
  secretary_id,
  user_id,
  subscription,
  userType,
  user
});
const loginFailure = (err) => ({ type: Type.LOGIN_FAILURE, err });

const registerAttempt = () => ({ type: Type.REGISTER_ATTEMPT });
const registerSuccess = (token, name) => ({
  type: Type.REGISTER_SUCCESS,
  token: token,
  name: name,
});
const registerFailure = (err) => ({ type: Type.REGISTER_FAILURE, err });

const forgotPasswordAttempt = (email) => ({
  type: Type.FORGOT_PASSWORD_ATTEMPT,
  email: email,
});
const forgotPasswordSuccess = (passwordToken, phoneNumber) => ({
  type: Type.FORGOT_PASSWORD_SUCCESS,
  passwordToken: passwordToken,
  phoneNumber: phoneNumber,
});
const forgotPasswordFailure = (err) => ({
  type: Type.FORGOT_PASSWORD_FAILURE,
  err,
});

const resetPasswordAttempt = (data) => ({
  type: Type.RESET_PASSWORD_ATTEMPT,
  data,
});
const resetPasswordSuccess = () => ({ type: Type.RESET_PASSWORD_SUCCESS });
const resetPasswordFailure = (err) => ({
  type: Type.RESET_PASSWORD_FAILURE,
  err,
});

const getCitiesAttempt = () => ({ type: Type.GET_CITIES_ATTEMPT });
const getCitiesSuccess = (cities) => ({
  type: Type.GET_CITIES_SUCCESS,
  cities: cities,


});
const getCitiesFailure = (err) => ({ type: Type.GET_CITIES_FAILURE, err });

const getMessagesAttempt = (user_id) => ({
  type: Type.GET_MESSAGES_ATTEMPT,
  user_id: user_id,
});
const getMessagesSuccess = (messages) => ({
  type: Type.GET_MESSAGES_SUCCESS,
  messages: messages,
});
const getMessagesFailure = (err) => ({ type: Type.GET_MESSAGES_FAILURE, err });

const sendMessagesAttempt = (receiver_id, sender_id, message) => ({
  type: Type.SEND_MESSAGES_ATTEMPT,
  receiver_id: receiver_id,
  sender_id: sender_id,
  message: message,
});
const sendMessagesSuccess = () => ({ type: Type.SEND_MESSAGES_SUCCESS });
const sendMessagesFailure = (err) => ({
  type: Type.SEND_MESSAGES_FAILURE,
  err,
});

const getVoiceMessagesAttempt = () => ({
  type: Type.GET_VOICE_MESSAGES_ATTEMPT,
});
const getVoiceMessagesSuccess = (voiceMessages) => ({
  type: Type.GET_VOICE_MESSAGES_SUCCESS,
  voiceMessages: voiceMessages,
});
const getVoiceMessagesFailure = (err) => ({
  type: Type.GET_VOICE_MESSAGES_FAILURE,
  err,
});

const getPackageFeaturesAttempt = () => ({
  type: Type.GET_PACKAGE_FEATURES_ATTEMPT,
});
const getPackageFeaturesSuccess = (package_features) => ({
  type: Type.GET_PACKAGE_FEATURES_SUCCESS,
  package_features: package_features,
});
const getPackageFeaturesFailure = (err) => ({
  type: Type.GET_PACKAGE_FEATURES_FAILURE,
  err,
});

const getPackagePlansAttempt = () => ({ type: Type.GET_PACKAGE_PLANS_ATTEMPT });
const getPackagePlansSuccess = (package_plans) => ({
  type: Type.GET_PACKAGE_PLANS_SUCCESS,
  package_plans: package_plans,
});
const getPackagePlansFailure = (err) => ({
  type: Type.GET_PACKAGE_PLANS_FAILURE,
  err,
});

const getPackageDurationsAttempt = () => ({
  type: Type.GET_PACKAGE_DURATIONS_ATTEMPT,
});
const getPackageDurationsSuccess = (package_durations) => ({
  type: Type.GET_PACKAGE_DURATIONS_SUCCESS,
  package_durations: package_durations,
});
const getPackageDurationsFailure = (err) => ({
  type: Type.GET_PACKAGE_DURATIONS_FAILURE,
  err,
});

const getSavePlansAttempt = (plan_id, user_id, coupon_id) => {
  return {
    type: Type.GET_SAVE_PLANS_ATTEMPT,
    plan_id: plan_id,
    user_id: user_id,
    coupon_id,
  };
};

const tripCreateAttempt = (trip) => ({
  type: Type.TRIP_CREATE_ATTEMPT,
  trip: trip,
});

const appointmentCreateAttempt = (appointment) => ({
  type: Type.APPOINTMENT_CREATE_ATTEMPT,
  appointment: appointment,
});

const socialEventCreateAttempt = (socialEvent) => ({
  type: Type.SOCIALEVENT_CREATE_ATTEMPT,
  socialEvent: socialEvent,
});

const mettingsCreateAttempt = (mettings) => ({
  type: Type.MEETINGS_CREATE_ATTEMPT,
  mettings: mettings,
});

const socialServiceCreateAttempt = (socialService) => ({
  type: Type.SOCIALSERVICE_CREATE_ATTEMPT,
  socialService: socialService,
});

const hotelBookingCreateAttempt = (hotelBooking) => ({
  type: Type.HOTELBOOKING_CREATE_ATTEMPT,
  hotelBooking: hotelBooking,
});

const getTripsAttempt = (tripData) => ({
  type: Type.GET_TRIPS_ATTEMPT,
  tripData: tripData,
});
const getTripsSuccess = (tripsData) => ({
  type: Type.GET_TRIPS_SUCCESS,
  tripsData: tripsData,
});
const getTripsFailure = (err) => ({ type: Type.GET_TRIPS_FAILURE, err });

const getCalenderAttempt = (calenderData) => ({
  type: Type.GET_CALENDER_ATTEMPT,
  calenderData: calenderData,
});
const getCalenderSuccess = (calendersData) => ({
  type: Type.GET_CALENDER_SUCCESS,
  calendersData: calendersData,
});
const getCalenderFailure = (err) => ({ type: Type.GET_CALENDER_FAILURE, err });

const showPaymentWebView = (value) => ({ type: Type.SHOW_PAYMENT_VIEW, value });



const getHotelAttempt = (hotelData) => ({
  type: Type.GET_HOTEL_ATTEMPT,
  hotelData: hotelData,
});
const getHotelSuccess = (hotelsData) => ({
  type: Type.GET_HOTEL_SUCCESS,
  hotelsData: hotelsData,
});
const getHotelFailure = (err) => ({ type: Type.GET_TRIPS_FAILURE, err });

const getSecondaryServiceAttempt = (secondaryData) => ({
  type: Type.GET_SECONDARY_SERVICE_ATTEMPT,
  secondaryData: secondaryData,
});
const getSecondaryServiceSuccess = (secondaryServiceData) => ({
  type: Type.GET_SECONDARY_SERVICE_SUCCESS,
  secondaryServiceData: secondaryServiceData,
});
const getSecondaryServiceFailure = (err) => ({
  type: Type.GET_SECONDARY_SERVICE_FAILURE,
  err,
});

const getMettingsAttempt = (mettingData) => ({
  type: Type.GET_METTINGS_ATTEMPT,
  mettingData: mettingData,
});
const getMettingsSuccess = (mettingsData) => ({
  type: Type.GET_METTINGS_SUCCESS,
  mettingsData: mettingsData,
});
const getMettingsFailure = (err) => ({ type: Type.GET_METTINGS_FAILURE, err });

const getSocialEventsAttempt = (socialData) => ({
  type: Type.GET_SOCIALEVENTS_ATTEMPT,
  socialData: socialData,
});
const getSocialEventsSuccess = (socialsData) => ({
  type: Type.GET_SOCIALEVENTS_SUCCESS,
  socialsData: socialsData,
});
const getSocialEventsFailure = (err) => ({
  type: Type.GET_SOCIALEVENTS_FAILURE,
  err,
});

const setRegisterInfo = (user) => ({
  type: Type.SET_REGISTER_INFO,
  user: user,
});
const sendPhoneVerificationNumberAttempt = (phoneNumber, code) => ({
  type: Type.SEND_PHONE_VERIFICATION_NUMBER_ATTEMPT,
  phoneNumber: phoneNumber,
  code: code,
});
const sendPhoneVerificationNumberSuccess = () => ({
  type: Type.SEND_PHONE_VERIFICATION_NUMBER_SUCCESS,
});

const getHomeScreenTextRequest = () => ({
  type: Type.GET_HOME_SCREEN_TEXT_REQUEST,
})

const getHomeScreenTextRequestSuccess = (action) => ({
  type: Type.GET_HOME_SCREEN_TEXT_REQUEST_SUCCESS,
  action: action
})
const getHomeScreenRequestTextFailure = (error) => ({
  type: Type.GET_HOME_SCREEN_TEXT_REQUEST_FAILURE,
  error: error
})

const sendPhoneVerificationNumberFailure = (err) => ({
  type: Type.SEND_PHONE_VERIFICATION_NUMBER_FAILURE,
  errorCode: err,
});
const signout = () => ({ type: Type.SIGNOUT });

export default {
  appStartAttempt,
  appStartSuccess,
  appResetAttempt,
  appResetSuccess,
  setLoadedVideo,


  getHomeScreenTextRequest,
  getHomeScreenTextRequestSuccess,
  getHomeScreenRequestTextFailure,

  setNotification,
  resetNotification,

  toggleDrawer,
  setCurrentTab,
  setCurrentScene,

  getNotificationsAttempt,
  getNotificationsSuccess,
  getNotificationsFailure,
  pusherNotificationReveived,

  setLanguage,

  ///// auth //
  loginAttempt,
  loginSuccess,
  loginFailure,

  forgotPasswordAttempt,
  forgotPasswordSuccess,
  forgotPasswordFailure,

  resetPasswordAttempt,
  resetPasswordSuccess,
  resetPasswordFailure,

  registerAttempt,
  registerSuccess,
  registerFailure,

  setRegisterInfo,
  sendPhoneVerificationNumberAttempt,
  sendPhoneVerificationNumberSuccess,
  sendPhoneVerificationNumberFailure,

  getCitiesAttempt,
  getCitiesSuccess,
  getCitiesFailure,

  getVoiceMessagesAttempt,
  getVoiceMessagesSuccess,
  getVoiceMessagesFailure,

  getMessagesAttempt,
  getMessagesSuccess,
  getMessagesFailure,

  sendMessagesAttempt,
  sendMessagesSuccess,
  sendMessagesFailure,

  getPackageFeaturesAttempt,
  getPackageFeaturesSuccess,
  getPackageFeaturesFailure,

  getPackagePlansAttempt,
  getPackagePlansSuccess,
  getPackagePlansFailure,

  getPackageDurationsAttempt,
  getPackageDurationsSuccess,
  getPackageDurationsFailure,

  getSavePlansAttempt,

  tripCreateAttempt,

  appointmentCreateAttempt,

  socialEventCreateAttempt,

  mettingsCreateAttempt,

  socialServiceCreateAttempt,

  hotelBookingCreateAttempt,

  getTripsAttempt,
  getTripsSuccess,
  getTripsFailure,

  getSocialEventsAttempt,
  getSocialEventsSuccess,
  getSocialEventsFailure,

  getMettingsAttempt,
  getMettingsSuccess,
  getMettingsFailure,

  getHotelAttempt,
  getHotelSuccess,
  getHotelFailure,

  getSecondaryServiceAttempt,
  getSecondaryServiceSuccess,
  getSecondaryServiceFailure,



  getCalenderAttempt,
  getCalenderSuccess,
  getCalenderFailure,

  signout,
  addNewContact,
  getNewContact,
  getContactsSuccess,
  deleteContact,


  showPaymentWebView
};
