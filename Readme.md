Run npm install inside the root folder, Followed by expo start



Some To do things for the backend developer!
>Please configure app with redux
>Use language to configure the project
>Theme file is present , you can make use of it.
>Expo API For recording and AUDIO to be integrated, please check docs of EXPO
>Time and Date Picker at TripForm page, needs to be configured into the same field.
Reference docs for date/time picker ( > https://www.npmjs.com/package/react-native-modal-datetime-picker/v/7.6.1)
>Validation required for button visibility on the pages (Trips,hotels,Meetings etc..)
The +ADD NEW REQUEST(main black button) gets removed in the client view, and shows
in the secretary view




Route.js
React-navigation v5 used. Latest docs, please create a drawer navigator so you can
link sessions based on if the user is logged in or not.
For the animation of the slider you can go through this
>https://www.youtube.com/watch?v=iD8N6cxyffw


File directory system :
Both -> both screens
Client -> client screens
Secretary->Secretary screens

(SAME FORMAT AS FOR COMPONENTS USED IN THEM)


Hp , Dp, library for responsive screen used ,



Project Dependencies :
  "dependencies": {
    "@react-native-community/masked-view": "0.1.6",
    "@react-navigation/bottom-tabs": "^5.2.6",
    "@react-navigation/native": "^5.1.5",
    "@react-navigation/stack": "^5.2.10",
    "@use-expo/font": "^2.0.0",
    "expo": "~37.0.3",
    "expo-av": "~8.1.0",
    "moment": "^2.24.0",
    "react": "~16.9.0",
    "react-dom": "~16.9.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-37.0.1.tar.gz",
    "react-native-calendar-picker": "^6.0.6",
    "react-native-check-box": "^2.1.7",
    "react-native-country-picker-modal": "^1.10.0",
    "react-native-gesture-handler": "~1.6.0",
    "react-native-material-dropdown": "^0.11.1",
    "react-native-modal-datetime-picker": "^7.6.1",
    "react-native-popup-dialog": "^0.18.3",
    "react-native-reanimated": "~1.7.0",
    "react-native-responsive-screen": "^1.4.1",
    "react-native-safe-area-context": "0.7.3",
    "react-native-screens": "~2.2.0",
    "react-native-swiper": "^1.6.0",
    "react-native-web": "~0.11.7"
  },








Theme variables used :


    primary : '#CEB07C',
    primaryDark:'#8f7343',
    primaryLight:'#e3c48f',
    secondary:'#231E1E',
    titleColor:'#fff',
    large:16,
    medium:14,
    small:12,
    xl:20,
    xxl:32,
    xxxl:38,
    StatusbarColor:'#CEB07C',
    StatusbarStyle:'light-content',
    pop:'Poppins-Medium',
    popbold:'Poppins-Bold',
    copper:'Copperplate',
    transparentColor:'#f5efe5'



