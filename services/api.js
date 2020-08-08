import apisauce from "apisauce";
import AppConfig from "../config/app-config";
import Reactotron from "reactotron-react-native"

import ENDPOINT from "../config/endpoint";
// TODO
// const userAgent = []
// userAgent.push(DeviceInfo.getModel())
// userAgent.push(DeviceInfo.getSystemVersion())
// userAgent.push(DeviceInfo.getManufacturer())
// userAgent.push(DeviceInfo.getDeviceName())
// console.log(userAgent.join(' '))

const core = (baseURL = AppConfig.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: 20000,
  });

  api.addAsyncRequestTransform(request => async () => {
    Reactotron.log("rr", request)
    console.log("req", request)
  })
  // // For Monitoring the status and handele the errors
  api.addMonitor(response => {
    Reactotron.log("mm", response)
    console.log("res", response)
  });

  const login = (user) => api.post(ENDPOINT.LOGIN, user);
  const forgotPassword = (email) => api.post(ENDPOINT.FORGOT_PASSWORD, email);
  const resetPassword = (data) => api.post(ENDPOINT.RESET_PASSWORD, data);
  const sendPhoneVerificationNumber = (phoneNumber, msg) => {
    let alfa_cell_baseUrl = "https://www.alfa-cell.com/api/";
    const alfa_cell_api = apisauce.create({
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 20000,
    });
    console.log(phoneNumber, msg);
    return alfa_cell_api.get(
      `https://www.alfa-cell.com/api/msgSend.php?apiKey=${AppConfig.alfa_cell_apiKey}&numbers=${phoneNumber}&sender=Beyond&msg=${msg}&applicationType=68&domanName=beyond.com&returnJson=1`
    );
  };

  const getCities = () => {
    // const tkn =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWQ4ZGM0Mzc3N2ExNzgwOGE3OTQ1YzA4NDcwYmJmMWIwMTEzYzU4Y2Q0YzE0NTQ5ZWE5NjRjYzZhZmQ1NTkxMjRiODY2ZmNjMWNjM2Q3MWIiLCJpYXQiOjE1OTAxMjk4MTIsIm5iZiI6MTU5MDEyOTgxMiwiZXhwIjoxNjIxNjY1ODEyLCJzdWIiOiIzMSIsInNjb3BlcyI6W119.EJzM8ixbRG2DUoTVzfMXn38qnUHAMreyKVwysoazorU0nm8HmBk7MLhxYKsEMtnxrtXVuSBBYd_hPcbgnJTWdDC1ejdyIHhovAXbRuk8sG44GJXpqEVQUAL9lEgIt4EWz_PPeU0oJ7s-blJvZW-gsF-tTm8n3K0mlENx9iQK3Xax3s6VHXbVqwrWiUiz_bDciw6kmK6PaKXsny_VzDazAJLMYQn9aLFo2Ir3E1Hw6YdMPuWU82gByXr6kVp0no0qr0aY9ELIC7tsGX_xSGjxo9OGD4rCZd8lBHghWvxEf6QQCfqIIz8hzMsI-7taBmqCGq5HqRSz0tNlfjF1sMsgW3LMafZTy_5t5gufiVF_u3zZcZfHF7amuevjENJZOPOpnMfl2VZA70-3LsyxVYq72JZo-8vuzkEk9QPP5rVaTCJzLd0vdQ9evHxoETpIC_B3BA2OVA41bX7b605KP-eGXGCX2gxe4ai5KFTJlMjOxTZRWEOvz5T2OGT8BiDQhR1AzCpVZFURLChnFFGu-IMumemb0Yq3XP-Kid8EHETawGYp9nsiRrSt5KUwM5uIi5xf-U6iazlc6li8eIwzHpM_28PI1M7fKusP7j-64emy4t6UW1uG3GPjRNXJ_izM0OuS34mCqbzmRkvJfb1xrAGxxt8sGtvNKdurAQw31tg7T7U";
    // api.setHeader("Authorization", `Bearer ${tkn}`);
    try {
      return api.get(`${ENDPOINT.GET_CITIES}`);
    } catch (err) {
      return "";
    }
  };

  const getMessages = (user_id) => api.get(ENDPOINT.GET_MESSAGES, { user_id: user_id });
  const getPackageFeatures = () => api.get(ENDPOINT.GET_PACKAGE_FEATURES);
  const getPlansFeatures = () => api.get(ENDPOINT.GET_PLANS_FEATURES);
  const getPackageDurations = () => api.get(ENDPOINT.GET_PACKAGE_DURATIONS);
  const savePlansFeatures = (plan_id, user_id, coupon_id) => api.post(ENDPOINT.SAVE_PLANS_FEATURES, { plan_id: plan_id, user_id: user_id, coupon_id: coupon_id });
  const getTripCreate = (trip) => api.post(ENDPOINT.GET_TRIP_CREATE, trip)
  const getAppointmentCreate = (appointment) => api.post(ENDPOINT.GET_APPOINTMENT_CREATE, appointment)
  const getSocialEventCreate = (socialEvent) => api.post(ENDPOINT.GET_SOCIALEVENT_CREATE, socialEvent)
  const mettingsCreate = (mettings) => api.post(ENDPOINT.GET_MEETINGS_CREATE, mettings)
  const socialServiceCreate = (socialService) => api.post(ENDPOINT.GET_SOCIALSERVICE_CREATE, socialService)
  const hotelBookingCreate = (hotelBooking) => api.post(ENDPOINT.GET_HOTELBOOKING_CREATE, hotelBooking)
  const getTripsData = (tripData) => api.post(ENDPOINT.GET_TRIPS_DATA, tripData);
  const getSocialEventsData = (socialData) => api.post(ENDPOINT.GET_TRIPS_DATA, socialData);
  const getMettingsData = (mettingData) => api.post(ENDPOINT.GET_TRIPS_DATA, mettingData);
  const getHotelsData = (hotelData) => api.post(ENDPOINT.GET_TRIPS_DATA, hotelData);
  const getSecondaryServiceData = (secondaryData) => api.post(ENDPOINT.GET_TRIPS_DATA, secondaryData);
  const getCalenderData = (calenderData) => api.post(ENDPOINT.GET_TRIPS_DATA, calenderData);
  const addContact = (contact) => api.post(ENDPOINT.ADD_CONTACT, contact);
  const getContacts = (id) => api.get(ENDPOINT.GET_CONTACTS + "/" + id);
  const deletContacts = (id) => api.get(ENDPOINT.DELETE_CONTACTS + "/" + id);


  const homeScreenText = (id) => api.get(ENDPOINT.HOME_SCREEN_TEXT);



  const sendMessage = (receiver_id, sender_id, message) => api.post(ENDPOINT.SENDMESSAGE, { sender_id, receiver_id, message });




  const getServiceMen = (opts) => api.get(`${ENDPOINT.SERVICE_MEN}`, opts);
  const getMyServicemen = (opts) => api.get(`${ENDPOINT.MY_SERVICE_MEN}`, opts);
  const getServiceManDetail = (id) => api.get(`${ENDPOINT.SERVICE_MEN}/${id}`);
  // api.addResponseTransform(response => {
  // 	// console.log(response);
  // 	if (response.ok && response.data && response.data.status === "success" && response.data.data) {
  // 		response.data = response.data.data
  // 	}
  // 	// TODO handle response.problem
  // })

  // api.addRequestTransform((request) => {
  // 	console.log('request', request);
  // })

  // Auth & Register
  const setAuthToken = (token) =>
    api.setHeader("Authorization", `Bearer ${token}` || "");

  const register = (user) => api.post(ENDPOINT.REGISTER, user);
  const getVoiceMessages = () => api.post(`${ENDPOINT.VOICE_MESSAGES}`);
  // Api return
  return {
    // Auth & Register
    setAuthToken,
    login,
    register,
    sendPhoneVerificationNumber,
    forgotPassword,
    resetPassword,
    getCities,
    getVoiceMessages,
    getMessages,
    sendMessage,
    getPackageFeatures,
    getPlansFeatures,
    getPackageDurations,
    savePlansFeatures,
    getTripCreate,
    getAppointmentCreate,
    getSocialEventCreate,
    mettingsCreate,
    socialServiceCreate,
    hotelBookingCreate,
    getTripsData,
    getSocialEventsData,
    getMettingsData,
    getHotelsData,
    getSecondaryServiceData,
    getCalenderData,
    addContact,
    getContacts,
    deletContacts,
    homeScreenText

    // User/Profile
  };
};

export default {
  core,
};
