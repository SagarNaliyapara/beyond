const ENDPOINT = {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/password/forget",
    RESET_PASSWORD: "/password/reset",
    GET_CITIES:"/cities-list",
    VOICE_MESSAGES:"/client-voice-messages",
    GET_MESSAGES:'/chat-messages',
    SENDMESSAGE:'/send-message',
    GET_PACKAGE_FEATURES:'/plan-features',
    GET_PLANS_FEATURES:'/package-plans',
    GET_PACKAGE_DURATIONS:'/package-durations',
    SAVE_PLANS_FEATURES:'/user-plan-buy',
    GET_TRIP_CREATE:'/trip-create',
    GET_APPOINTMENT_CREATE:'/appointment-create',
    GET_SOCIALEVENT_CREATE:'/socialevent-create',
    GET_MEETINGS_CREATE:'/meeting-create',
    GET_SOCIALSERVICE_CREATE:'/socialservice-create',
    GET_HOTELBOOKING_CREATE:'/hotelbooking-create',
    GET_TRIPS_DATA:'/secretary-dashboard',
    ADD_CONTACT:'/add_contacts',
    GET_CONTACTS:'/get_contacts',
    DELETE_CONTACTS:'/delete_contact'


}

export default ENDPOINT