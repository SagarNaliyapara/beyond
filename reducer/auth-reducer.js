import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import { REHYDRATE } from 'redux-persist/constants'
import Type from '../actions/type'
// import UserActionsType from '../../user/actions/type'

export const INITIAL_STATE = Immutable({
	attempting: false,
	errorCode: null,
	errors: null,
	token: "",
	passwordToken: "",
	name: "",
	city: "",
	email: "",
	note: "",
	password: "",
	phoneNumber: "",
	title: "",
	workField: "",
	code: "",
	screenBeforeOptScreen: "",
	cities:[],
	secretary_id:'',
	user_id:'',
	subscription: null,
	userType:""
})

const getCitiesSuccess = (state, action) => {

	let cities =[]
	action.cities.map((city)=>{
		cities.push({
			id: city.id,
			value: city.name
		})

	})
	return state.merge({ cities: cities })
}


const resetAuth = state => state.merge({ attempting: false, errorCode: null })
const loginAttempt = state => state.merge({ attempting: true, errorCode: null })
const loginSuccess = (state, { token, name,secretary_id,user_id, subscription ,userType}) => state.merge({ ...INITIAL_STATE, token, name,user_id,secretary_id, subscription,userType })
const loginFailure = (state, { errorCode }) => state.merge({ ...INITIAL_STATE, errorCode })


const forgotPasswordAttempt = (state, { email }) => state.merge({ attempting: true, errorCode: null, email })
const forgotPasswordSuccess = (state, { passwordToken, phoneNumber }) => state.merge({ attempting: false, passwordToken, phoneNumber })
const forgotPasswordFailure = (state, { errorCode }) => state.merge({ attempting: false, errorCode })

const resetPasswordAttempt = (state) => state.merge({ attempting: true, errorCode: null })
const resetPasswordSuccess = (state) => state.merge({ attempting: false })
const resetPasswordFailure = (state, { errorCode }) => state.merge({ attempting: false, errorCode })

const registerAttempt = state => state.merge({ attempting: true, errorCode: null })
const registerSuccess = (state, { token, name }) => state.merge({ attempting: false, token, name })
const registerFailure = (state, { errorCode }) => state.merge({ attempting: false, errorCode })

const setRegisterInfo = (state, { user }) => state.merge({ ...INITIAL_STATE, attempting: true, ...user, screenBeforeOptScreen: "signup" })
const sendPhoneVerificationNumberAttempt = (state, { code }) => state.merge({ attempting: true, code })
const sendPhoneVerificationNumberSuccess = (state) => state.merge({ attempting: false })
const sendPhoneVerificationNumberFailure = (state, { errorCode }) => state.merge({ attempting: false, errorCode })

const signout = state => state.merge({ ...INITIAL_STATE })

const rehydrate = (state, action) => {
	const persistedAuth = action.payload.auth

	if (persistedAuth) {
		return persistedAuth.merge({
			attempting: false,
			errorCode: null,
			errors: null,
			token: "",
			passwordToken: "",
			name: "",
			city: "",
			email: "",
			note: "",
			password: "",
			phoneNumber: "",
			title: "",
			workField: "",
			code: "",
			screenBeforeOptScreen: ""
		})
	}

	return state
}
// map our types to our handlers
const ACTION_HANDLERS = {
	[Type.APP_START_ATTEMPT]: resetAuth,

	[Type.LOGIN_ATTEMPT]: loginAttempt,
	[Type.LOGIN_SUCCESS]: loginSuccess,
	[Type.LOGIN_FAILURE]: loginFailure,

	[Type.FORGOT_PASSWORD_ATTEMPT]: forgotPasswordAttempt,
	[Type.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
	[Type.FORGOT_PASSWORD_FAILURE]: forgotPasswordFailure,

	[Type.RESET_PASSWORD_ATTEMPT]: resetPasswordAttempt,
	[Type.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
	[Type.RESET_PASSWORD_FAILURE]: resetPasswordFailure,


	[Type.REGISTER_ATTEMPT]: registerAttempt,
	[Type.REGISTER_SUCCESS]: registerSuccess,
	[Type.REGISTER_FAILURE]: registerFailure,

	[Type.SET_REGISTER_INFO]: setRegisterInfo,
	[Type.SEND_PHONE_VERIFICATION_NUMBER_ATTEMPT]: sendPhoneVerificationNumberAttempt,
	[Type.SEND_PHONE_VERIFICATION_NUMBER_SUCCESS]: sendPhoneVerificationNumberSuccess,
	[Type.SEND_PHONE_VERIFICATION_NUMBER_FAILURE]: sendPhoneVerificationNumberFailure,
	[Type.SIGNOUT]: signout,

	[Type.GET_CITIES_SUCCESS]:getCitiesSuccess,
	[REHYDRATE]: rehydrate,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
