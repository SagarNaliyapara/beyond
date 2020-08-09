import { delay } from "redux-saga";
import { AsyncStorage } from "react-native";
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
import * as NavigationService from "../services/navigationService";
// Listen to various general app actions
const getToken = (state) => state.auth.token;
const getLocale = (state) => state.app.locale;
const getPhoneNumber = (state) => state.auth.phoneNumber;
const getEmail = (state) => state.auth.email;
const getPassword = (state) => state.auth.password;
const getName = (state) => state.auth.name;
const getCity = (state) => state.auth.city;
const getWorkField = (state) => state.auth.workField;
const getNote = (state) => state.auth.note;
const getTitle = (state) => state.auth.title;
const getScreenBeforeOptScreen = (state) => state.auth.screenBeforeOptScreen;

export default (api) => {
  function* getCities() {
    try {
      const response = yield call(api.getCities);
      if (
        response &&
        response.ok &&
        response.data &&
        response.data.success &&
        response.data.success
      ) {
        yield put(Actions.getCitiesSuccess(response.data.success.cities));
      } else {
        yield put(Actions.getCitiesFailure("INVALID_INFORMATION"));
      }
      // alert(JSON.stringify(response))
    } catch (err) { }
  }
  function toUnicode(theString) {
    return theString
      .split("")
      .map(function (value, index, array) {
        // var temp = value.charCodeAt(0).toString(16).toUpperCase();
        var temp = value.charCodeAt(0).toString(16).padStart(4, "0");
        if (temp.length > 2) {
          return temp;
        }
        return value;
      })
      .join("");
  }

  function* loginAttempt(action) {
    const { user } = action;

    try {
      const response = yield call(api.login, user);

      if (response && response.ok && response.data && response.data.success) {
        let secretary_id = "";
        let subscription = null;
        let userType = ""
        let user_Id = response.data.success.user.id;
        if (
          response.data.success.subscription &&
          response.data.success.subscription
        ) {
          subscription = response.data.success.subscription;
          if (response.data.success.subscription.secretary_id) {
            secretary_id = response.data.success.subscription.secretary_id;
          }
        }
        if (response.data.success.user) {
          userType = response.data.success.user.user_type
        }
        // alert(user_Id)

        yield put(
          Actions.loginSuccess(
            response.data.success.token,
            response.data.success.user.name,
            secretary_id,
            user_Id,
            subscription,
            userType,
            response.data.success.user
          )
        );
      } else {
        yield put(Actions.loginFailure("INVALID_INFORMATION"));
      }
    } catch (err) {
      yield put(Actions.loginFailure("SYSTEM_ERROR"));
    }
  }


  function* loginSuccess(action) {
    const { token } = action;
    if (!token) {
      throw new Error("No token provided by server.");
    }

    api.setAuthToken(token);
    const storeKey = 'user_type';
    AsyncStorage.setItem(storeKey, action.userType);

    // NavigationService.navigate("Home");
    NavigationService.navigate("main");
    // yield put(UserActions.getUserAttempt(true))
  }

  function* loginFailure(action) {
    const { err } = action;
    // const { errorCode } = action
    // yield put(CoreActions.setNotification('danger', yield translate(errorCode)))
    yield put(Actions.setNotification("danger", err));
  }

  function* forgotPasswordAttempt(action) {
    const { email } = action;
    try {
      const response = yield call(api.forgotPassword, { email: email });
      if (response && response.ok && response.data && response.data.token) {
        // yield put(Actions.forgotPasswordSuccess(response.data.token, response.data.phone))
        yield put(
          Actions.forgotPasswordSuccess(response.data.token, "966555644047")
        );
      } else {
        yield put(Actions.forgotPasswordFailure("INVALID_INFORMATION"));
      }
    } catch (err) {
      yield put(Actions.forgotPasswordFailure("SYSTEM_ERROR"));
    }
  }

  function* forgotPasswordSuccess(action) {
    // NavigationService.navigate("ResetPassword");
    const { phoneNumber } = action;
    let rnd_num_str = "0000" + Math.floor(Math.random() * 10000);
    rnd_num_str = rnd_num_str.substring(
      rnd_num_str.length - 4,
      rnd_num_str.length
    );
    yield put(
      Actions.sendPhoneVerificationNumberAttempt(phoneNumber, rnd_num_str)
    );
  }

  function* forgotPasswordFailure(action) {
    const { err } = action;
    // const { errorCode } = action
    // yield put(CoreActions.setNotification('danger', yield translate(errorCode)))
    yield put(Actions.setNotification("danger", err));
  }

  function* resetPasswordAttempt(action) {
    const { data } = action;
    try {
      // const locale = yield select(getLocale)
      const response = yield call(api.resetPassword, data);
      if (response && response.ok && response.status == 200) {
        const succes_msg = yield translate("RESET_PASSWORD_SUCCESS");
        yield put(Actions.setNotification("success", succes_msg));
        yield put(Actions.resetPasswordSuccess());
      } else {
        yield put(Actions.resetPasswordFailure("INVALID_INFORMATION"));
      }
    } catch (err) {
      yield put(Actions.resetPasswordFailure("SYSTEM_ERROR"));
    }
  }

  function* resetPasswordSuccess(action) {
    // Console.log(locale)
    NavigationService.navigate("SignIn");
  }

  function* resetPasswordFailure(action) {
    const { err } = action;
    // const { errorCode } = action
    // yield put(CoreActions.setNotification('danger', yield translate(errorCode)))
    yield put(Actions.setNotification("danger", err));
  }

  function* setRegisterInfo(action) {
    const { user } = action;
    const { phoneNumber } = user;
    let rnd_num_str = "0000" + Math.floor(Math.random() * 10000);
    rnd_num_str = rnd_num_str.substring(
      rnd_num_str.length - 4,
      rnd_num_str.length
    );
    yield put(
      Actions.sendPhoneVerificationNumberAttempt(phoneNumber, rnd_num_str)
    );
  }

  function* sendPhoneVerificationNumberAttempt(action) {
    const { code, phoneNumber } = action;
    const locale = yield select(getLocale);
    // console.log(action)
    let msg_seed = yield translate("SMS_VERIFICATION");
    let msg = `${msg_seed}${code}`;
    msg = toUnicode(msg);
    try {
      const response = yield call(
        api.sendPhoneVerificationNumber,
        phoneNumber,
        msg
      );
      if (response && response.ok && response.status == 200 && response.data) {
        if (response.data.ResponseStatus == "success") {
          let succes_msg =
            locale == "en"
              ? response.data.Data.MessageEn
              : response.Data.Error.MessageAr;
          console.log(succes_msg);
          yield put(Actions.setNotification("success", succes_msg));
          yield put(Actions.sendPhoneVerificationNumberSuccess());
        } else {
          let failed_msg =
            locale == "en"
              ? response.data.Error.MessageEn
              : response.data.Error.MessageAr;
          yield put(Actions.sendPhoneVerificationNumberFailure(failed_msg));
        }
      } else {
        let msg_seed = yield translate("SYSTEM_ERROR");
        yield put(Actions.sendPhoneVerificationNumberFailure(msg_seed));
      }
    } catch (err) {
      let msg_seed = yield translate("SYSTEM_ERROR");
      yield put(Actions.sendPhoneVerificationNumberFailure(msg_seed));
    }
  }

  function* sendPhoneVerificationNumberSuccess(action) {
    // console.log(NavigationService.getCurrentScreen())
    NavigationService.navigate("OptVerification");
  }

  function* sendPhoneVerificationNumberFailure(action) {
    const { errorCode } = action;
    yield put(Actions.setNotification("danger", errorCode));
  }

  function* registerAttempt(action) {
    const phoneNumber = yield select(getPhoneNumber);
    const email = yield select(getEmail);
    const name = yield select(getName);
    const password = yield select(getPassword);
    const city = yield select(getCity);
    const workField = yield select(getWorkField);
    const title = yield select(getTitle);
    const note = yield select(getNote);

    const screenBeforeOptScreen = yield select(getScreenBeforeOptScreen);
    let user = {
      phone: phoneNumber,
      email: email,
      name: name,
      password: password,
      city: city,
      workField: workField,
      title: title,
      note: note,
    };
    try {
      const response = yield call(api.register, user);
      console.log("register res: ", response);
      if (response && response.ok && response.data && response.data.success) {
        console.log("register res: ", response.data.success.token);
        yield put(
          Actions.registerSuccess(
            response.data.success.token,
            response.data.success.name
          )
        );
      } else {
        yield put(Actions.registerFailure("INVALID_INFORMATION"));
      }
    } catch (err) {
      yield put(Actions.registerFailure("SYSTEM_ERROR"));
    }
  }

  function* registerSuccess(action) {
    const { token } = action;
    if (!token) {
      throw new Error("No token provided by server.");
    }
    api.setAuthToken(token);
    // NavigationService.navigate("Home");
    NavigationService.navigate("main");
    // yield put(UserActions.getUserAttempt(true))
  }

  function* registerFailure(action) {
    const { err } = action;
    // const { errorCode } = action
    // yield put(CoreActions.setNotification('danger', yield translate(errorCode)))
    yield put(Actions.setNotification("danger", err));
  }

  function* signout(action) {
    const { err } = action;
    // const { errorCode } = action
    // yield put(CoreActions.setNotification('danger', yield translate(errorCode)))
    NavigationService.navigate("Splash");
  }
  // The Main Watcher function
  function* startWatchers() {
    yield fork(takeEvery, Type.GET_CITIES_ATTEMPT, getCities);

    yield fork(takeEvery, Type.LOGIN_ATTEMPT, loginAttempt);
    yield fork(takeEvery, Type.LOGIN_SUCCESS, loginSuccess);
    yield fork(takeEvery, Type.LOGIN_FAILURE, loginFailure);

    yield fork(takeEvery, Type.FORGOT_PASSWORD_ATTEMPT, forgotPasswordAttempt);
    yield fork(takeEvery, Type.FORGOT_PASSWORD_SUCCESS, forgotPasswordSuccess);
    yield fork(takeEvery, Type.FORGOT_PASSWORD_FAILURE, forgotPasswordFailure);

    yield fork(takeEvery, Type.RESET_PASSWORD_ATTEMPT, resetPasswordAttempt);
    yield fork(takeEvery, Type.RESET_PASSWORD_SUCCESS, resetPasswordSuccess);
    yield fork(takeEvery, Type.RESET_PASSWORD_FAILURE, resetPasswordFailure);

    yield fork(takeEvery, Type.REGISTER_ATTEMPT, registerAttempt);
    yield fork(takeEvery, Type.REGISTER_SUCCESS, registerSuccess);
    yield fork(takeEvery, Type.REGISTER_FAILURE, registerFailure);

    yield fork(takeEvery, Type.SET_REGISTER_INFO, setRegisterInfo);
    yield fork(
      takeEvery,
      Type.SEND_PHONE_VERIFICATION_NUMBER_ATTEMPT,
      sendPhoneVerificationNumberAttempt
    );
    yield fork(
      takeEvery,
      Type.SEND_PHONE_VERIFICATION_NUMBER_SUCCESS,
      sendPhoneVerificationNumberSuccess
    );
    yield fork(
      takeEvery,
      Type.SEND_PHONE_VERIFICATION_NUMBER_FAILURE,
      sendPhoneVerificationNumberFailure
    );
    yield fork(takeEvery, Type.SIGNOUT, signout);
  }
  return {
    startWatchers,
  };
};
