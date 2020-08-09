import React, { Component, createRef } from 'react';
import { AsyncStorage } from "react-native";
import ScalingDrawer from './components/both/SwipeAbleDrawer';
import { connect } from "react-redux"
// import NavigationService from './NavigationService';

// import Home from './screens/Home';
// import Profile from './screens/Profile';

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
import addContact from "./screens/client/addContact";
import SocialLiveForm from "./screens/secretary/RequestForms/SocialLiveForm";
import OnHold from "./screens/secretary/SecretaryProfile/OnHold";
import Completed from "./screens/secretary/SecretaryProfile/Completed";
import Profile from "./screens/secretary/Profile";
import Chat from "./screens/secretary/Chat"
import InProcess from './screens/secretary/SecretaryProfile/InProcess'
import RequestList from "./screens/secretary/RequestList";
import Terms from "./screens/both/Terms";
import Menu from './components/both/Menu';
import CustomizedBottomTabBar from './components/both/CustomizedBottomTabBar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux'
import * as NavigationService from './services/navigationService'
import EditUserProfile from "./screens/client/EditUserProfile";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const drawer = createRef();

const defaultScalingDrawerConfig = {
  scalingFactor: 0.7,
  swipeOffset: 20,
};


const HomeTabNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Contacts" component={Contacts} options={{ gestureEnabled: false }} />
      <Stack.Screen name="addContact" component={addContact} options={{ gestureEnabled: false }} />
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
      <Stack.Screen name="InProcess" component={InProcess} options={{ gestureEnabled: false }} />
      <Stack.Screen name="RequestList" component={RequestList} options={{ gestureEnabled: false }} />
    </Stack.Navigator>

  );
}

const SecretaryTabNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Profile} options={{ gestureEnabled: false }} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ gestureEnabled: false }} />
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
      <Stack.Screen name="InProcess" component={InProcess} options={{ gestureEnabled: false }} />
      <Stack.Screen name="RequestList" component={RequestList} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}

const NotificationTabNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notification" component={Notification} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}
const ProfileTabNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={EditUserProfile} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}
const ChatTabNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Chat" component={Chat} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}


class AppNavigation extends Component {

  constructor(props){
    super(props);
    this.state = {
      val: ''
    }
    this.retrieveData = this.retrieveData.bind(this)
  }

  componentDidMount(){
    this.retrieveData()
  }

  retrieveData = () => {
      AsyncStorage.getItem("user_type", (err, value) => {
        if (value !== null) {
          // We have data!!
          this.setState({val : value})
        }
    })
  }

  render() {

    return (
      <ScalingDrawer
        ref={drawer}
        content={<Menu drawer={drawer} />}
        {...defaultScalingDrawerConfig}
        rtl={this.props.locale == "ar"}
        onClose={() => console.log('close')}
        onOpen={() => console.log('open')}
      >
        <Tab.Navigator tabBar={props => <CustomizedBottomTabBar {...props} />}>
        {this.state.val === "secretary" ? <Tab.Screen name="HomeTab" component={SecretaryTabNavigator} /> :  <Tab.Screen name="HomeTab" component={HomeTabNavigator}/>}
        <Tab.Screen name="NotificationTab" component={NotificationTabNavigator} />
        <Tab.Screen name="ProfileTab" component={ProfileTabNavigator} />
        <Tab.Screen name="ChatTab" component={ChatTabNavigator} />
        </Tab.Navigator>
      </ScalingDrawer>
    );
  }
}
const mapStateToProps = state => ({
  locale: state.app.locale,
})

export default connect(mapStateToProps, null)(AppNavigation)
