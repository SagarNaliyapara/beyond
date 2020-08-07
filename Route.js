import React, { Component } from "react";
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import theme from './Theme'
import GeneralStatusBarColor from './components/styles/GeneralStatusBarColor';
import NotificationBar from "./components/both/notification"

import Main from "./MainAppNavigation"

import SignIn from './screens/both/SignIn'
import OptVerification from './screens/both/OptVerification'
import Splash from './screens/both/Splash'
import SignUp from './screens/both/SignUp'
import ResetPassword from './screens/both/ResetPassword'
import ForgotPassword from './screens/both/ForgotPassword'

import OrderHistory from './screens/both/OrderHistory'
import Notification from './screens/both/Notification'
import Home from "./screens/client/Home";
import Contacts from "./screens/client/Contacts";
import SecretaryProfile from "./screens/client/SecretaryProfile";
import Subscribe from "./screens/client/Subscribe";
import Trips from "./screens/client/Trips";
import SocialLife from "./screens/client/SocialLife";
import Meetings from "./screens/client/Meetings";
import Hotels from "./screens/client/Hotels";
import SecondaryServices from "./screens/client/SecondaryServices";
import Calendar from "./screens/client/Calendar";
import CreateRequest from './screens/secretary/CreateRequest'
import RequestForm from "./screens/secretary/RequestForm";
import ContactSecretary from "./screens/secretary/ContactSecretary";
import Clients from "./screens/secretary/Clients";
import RequestDetails from "./screens/secretary/RequestDetails";
import ClientRequests from "./screens/secretary/ClientRequests";
import TripForm from "./screens/secretary/RequestForms/TripForm";
import HotelForm from "./screens/secretary/RequestForms/HotelForm";
import ImportantDates from "./screens/secretary/RequestForms/ImportantDates";
import MeetingForm from "./screens/secretary/RequestForms/MeetingForm";
import ServicesForm from "./screens/secretary/RequestForms/ServicesForm";
import SocialLiveForm from "./screens/secretary/RequestForms/SocialLiveForm";
import OnHold from "./screens/secretary/SecretaryProfile/OnHold";
import Completed from "./screens/secretary/SecretaryProfile/Completed";
import Profile from "./screens/secretary/Profile";
import InProcess from './screens/secretary/SecretaryProfile/InProcess'
import RequestList from "./screens/secretary/RequestList";
import Terms from "./screens/both/Terms";
import * as NavigationService from './services/navigationService'
import { from } from "seamless-immutable";
const Stack = createStackNavigator();
// stack navigator
class Route extends Component {

  render() {
    const { notification, onResetNavigation } = this.props
    let notificiationProps
    if (notification)
      notificiationProps = Object.assign({}, notificiationProps, {
        type: notification.type,
        message: notification.message,
      })
    return (
      <View style={{ flex: 1 }}>
        <GeneralStatusBarColor backgroundColor={theme.StatusbarColor}
          barStyle={theme.StatusbarStyle} />
        <NavigationContainer
          ref={nav => NavigationService.setNavigator(nav)} >
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ gestureEnabled: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ gestureEnabled: false }} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ gestureEnabled: false }} />
            <Stack.Screen name="OptVerification" component={OptVerification} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Terms" component={Terms} options={{ gestureEnabled: false }} />
            <Stack.Screen name="main" component={Main} options={{ gestureEnabled: false }} />
            {/*<Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Notification" component={Notification} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Contacts" component={Contacts} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SecretaryProfile" component={SecretaryProfile} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Subscribe" component={Subscribe} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Trips" component={Trips} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SocialLife" component={SocialLife} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Meetings" component={Meetings} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Hotels" component={Hotels} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SecondaryServices" component={SecondaryServices} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Calendar" component={Calendar} options={{ gestureEnabled: false }} />
            <Stack.Screen name="CreateRequest" component={CreateRequest} options={{ gestureEnabled: false }} />
            <Stack.Screen name="RequestForm" component={RequestForm} options={{ gestureEnabled: false }} />
            <Stack.Screen name="ContactSecretary" component={ContactSecretary} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Clients" component={Clients} options={{ gestureEnabled: false }} />
            <Stack.Screen name="RequestDetails" component={RequestDetails} options={{ gestureEnabled: false }} />
            <Stack.Screen name="ClientRequests" component={ClientRequests} options={{ gestureEnabled: false }} />
            <Stack.Screen name="TripForm" component={TripForm} options={{ gestureEnabled: false }} />
            <Stack.Screen name="HotelForm" component={HotelForm} options={{ gestureEnabled: false }} />
            <Stack.Screen name="ImportantDates" component={ImportantDates} options={{ gestureEnabled: false }} />
            <Stack.Screen name="MeetingForm" component={MeetingForm} options={{ gestureEnabled: false }} />
            <Stack.Screen name="ServicesForm" component={ServicesForm} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SocialLiveForm" component={SocialLiveForm} options={{ gestureEnabled: false }} />
            <Stack.Screen name="OnHold" component={OnHold} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Completed" component={Completed} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ gestureEnabled: false }} />
            <Stack.Screen name="InProcess" component={InProcess} options={{ gestureEnabled: false }} />
            <Stack.Screen name="RequestList" component={RequestList} options={{ gestureEnabled: false }} /> */}
          </Stack.Navigator>
        </NavigationContainer>
        <NotificationBar onPress={onResetNavigation} {...notificiationProps} />
      </View>
    );
  }
}
export default Route
