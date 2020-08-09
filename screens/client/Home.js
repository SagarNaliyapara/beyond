//Order history screen design from the both panel
import React, { useState, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import theme from "../../Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Footer from "../../components/both/Footer";
import HeaderSmall from "../../components/both/HeaderSmall";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather, Entypo } from "@expo/vector-icons";
//this library is used for opening popups. please read documentation for more info
import Dialog, { DialogContent } from "react-native-popup-dialog";
//expo av api for audio recording
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import TransText from "../../components/both/transtext";

import Trip_icon from "../../assets/trip.svg";
import Date_icon from "../../assets/date.svg";
import Social_icon from "../../assets/social.svg";
import Meeting_icon from "../../assets/meeting.svg";
import Hotel_icon from "../../assets/hotel.svg";
import Sec_service_icon from "../../assets/service.svg";
import Contact_icon from "../../assets/contact.svg";
import Order_History_icon from "../../assets/history.svg";
import helpers from "../../components/styles/helpers";
import RecordingModal from "../../components/both/AudioRecordingModal";
import Actions from "../../actions/creator"

import CustomizedBottomTabBar from '../../components/both/CustomizedBottomTabBar';
import { Notifications } from "expo";

const sampleimg = "https://randomuser.me/api/portraits/men/29.jpg";

class Home extends Component {
  state = {
    visible: false,
    recordingPermission: false
  };

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return null;
    }
    return await Notifications.getExpoPushTokenAsync();
  }

  tokenApiCall(token) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
        body: {
          token: token
        }
      },
    };
    fetch("https://beyond-ksa.com/api/token/" + this.props.id, options)
      .then(red => red.json())
      .then(res => {
        if (res.success) {
          alert(res.success);
        }
      }).catch((error) => {
        // console.log("error  ----> ",JSON.stringify(error));
      })
  }

  async componentWillMount() {


    const { navigation, name, locale, id } = this.props;
    this.registerForPushNotificationsAsync().then(token => {
      if (token) {
        alert(token.toString())
        this.tokenApiCall(token)
      }
    });
    // this.props.dispatch(Actions.getCitiesAttempt());
    this.props.dispatch(Actions.getVoiceMessagesAttempt());
    this.props.dispatch(Actions.getNewContact(this.props.id));
    // this.props.dispatch(Actions.tripCreateAttempt());
    // // this.props.dispatch(Actions.getPackageFeaturesAttempt());
    // this.props.dispatch(Actions.getPackagePlansAttempt());
    // this.props.dispatch(Actions.getPackageDurationsAttempt());
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (response.state === "granted") {
      this.setState({ recordingPermission: true })
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
  }

  render() {
    const { navigation, name, locale } = this.props;
    return (
      <ImageBackground
        source={require("../../assets/bg.png")}
        style={styles.container}
      >
        <View style={styles.header}>
          {/* this is the header component with 2 icons */}
          <HeaderSmall leftIcon="menu" rightIcon="settings" />
        </View>
        <View style={styles.titleSpace}>
          {/* space the mid section  */}
          <View
            style={[
              { flexDirection: "row", width: "100%", alignItems: "center" },
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
          >
            <Image source={{ uri: sampleimg }} style={styles.img} />
            <View style={{ paddingLeft: wp(3), paddingRight: wp(3) }}>
              <Text
                style={[styles.title, locale == "ar" && { textAlign: "right" }]}
              >
                {name}
              </Text>
              <TransText onPress={() => navigation.navigate("ProfileTab")}
                style={[
                  styles.subtitle,
                  locale == "ar" && { textAlign: "right" },
                ]}
                transkey="EDIT_PROFILE"
              />
            </View>
          </View>
          {/* speak button starts here  */}

          <TouchableOpacity
            onPress={() => {
              this.setState({ visible: true });
            }}
            style={[
              styles.speakbutton,
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
          >
            <Feather name="mic" size={22} color={"#fff"} />
            <TransText style={styles.btnText} transkey="ORDER_HERE" />
          </TouchableOpacity>
          {this.state.visible ? (
            <RecordingModal
              token={this.props.token}
              showModal={this.state.visible}
              setShowModal={(value) => {
                this.setState({ visible: value });
              }}
            />
          ) : null}
        </View>

        <View
          style={[
            styles.body,
            locale == "ar" && { flexDirection: "row-reverse" },
          ]}
        >
          <ImageBackground
            source={require("../../assets/bgTransparentLogo.png")}
            style={{
              height: 300,
              width: 185,
              position: "absolute",
              left: wp(25),
              right: wp(25),
              bottom: hp(5),
            }}
          />
          {/* CARD */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Trips")}
            style={styles.containerCard}
          >
            {/* <Image source={require('../../assets/trip.png')} style={{ height: 35, width: 35 }} /> */}
            <Trip_icon width={helpers.size(50)} height={helpers.size(45)} />
            <TransText style={styles.menutext} transkey="Trips" />
          </TouchableOpacity>
          {/* CARD */}

          {/* CARD */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Calendar")}
            style={styles.containerCard}
          >
            <Date_icon width={helpers.size(40)} height={helpers.size(35)} />
            <TransText style={styles.menutext} transkey="Important_Date" />
          </TouchableOpacity>
          {/* CARD */}

          {/* CARD */}
          <TouchableOpacity
            onPress={() => navigation.navigate("SocialLife")}
            style={styles.containerCard}
          >
            <Social_icon width={helpers.size(40)} height={helpers.size(35)} />
            <TransText style={styles.menutext} transkey="Life_Event" />
          </TouchableOpacity>
          {/* CARD */}

          {/* CARD */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Meetings")}
            style={styles.containerCard}
          >
            <Meeting_icon width={helpers.size(40)} height={helpers.size(35)} />
            <TransText style={styles.menutext} transkey="Meetings" />
          </TouchableOpacity>
          {/* CARD */}

          {/* CARD */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Hotels")}
            style={styles.containerCard}
          >
            <Hotel_icon width={helpers.size(40)} height={helpers.size(35)} />
            <TransText style={styles.menutext} transkey="Hotels" />
          </TouchableOpacity>
          {/* CARD */}

          {/* CARD */}
          <TouchableOpacity
            onPress={() => navigation.navigate("SecondaryServices")}
            style={styles.containerCard}
          >
            <Sec_service_icon
              width={helpers.size(40)}
              height={helpers.size(35)}
            />
            <TransText style={styles.menutext} transkey="Secondary_Services" />
          </TouchableOpacity>
          {/* CARD */}

          {/* CARD */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Contacts")}
            style={styles.containerCard}
          >
            <Contact_icon width={helpers.size(40)} height={helpers.size(35)} />
            <TransText style={styles.menutext} transkey="Contacts" />
          </TouchableOpacity>
          {/* CARD */}

          {/* CARD */}
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderHistory")}
            style={styles.containerCard}
          >
            <Order_History_icon
              width={helpers.size(40)}
              height={helpers.size(35)}
            />
            <TransText style={styles.menutext} transkey="Order_History" />
          </TouchableOpacity>

          {/* CARD */}
          <TouchableOpacity
            visible="hidden"
            onPress={() => navigation.navigate("OrderHistory")}
            style={[styles.containerCard, { opacity: 0 }]}
            disabled={true}
          >
            <Text style={styles.menutext}>Order History</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 24 : 0,
  },
  header: {
    flex: 1,
  },
  titleSpace: {
    flex: 2.5,
    alignItems: "center",
    paddingLeft: wp(6),
    paddingRight: wp(6),
  },
  body: {
    flex: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
    paddingLeft: wp(8),
    paddingRight: wp(8),
    paddingTop: hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  footer: {
    flex: 1,
  },
  title: {
    fontSize: theme.xxl / 1.25,
    color: theme.titleColor,
    fontFamily: theme.popbold,
  },
  subtitle: {
    fontSize: theme.xxl / 2,
    color: theme.titleColor,
    fontFamily: theme.popbold,
  },
  justnowtext: {
    paddingTop: hp(3),
    fontFamily: theme.pop,
    color: "#7c7c7c",
    fontSize: theme.small,
  },
  img: {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  speakbutton: {
    backgroundColor: theme.secondary,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 15,
    marginTop: 15,
  },
  btnText: {
    color: "#fff",
    fontFamily: theme.pop,
    fontSize: theme.large,
    paddingLeft: wp(2),
    paddingRight: wp(2),
  },
  heading: {
    color: theme.primary,
    fontFamily: theme.popbold,
    fontSize: theme.xxl / 1.2,
  },
  containerCard: {
    alignItems: "center",
    justifyContent: "center",
    height: hp(14),
    width: wp(24),
    borderRadius: 10,
    marginTop: hp(2),
    // marginLeft: wp(3),
    backgroundColor: theme.transparentColor,
    opacity: 0.7,
  },
  menutext: {
    color: theme.primary,
    fontSize: theme.small,
    fontFamily: theme.popbold,
    marginTop: helpers.size(5),
    textAlign: "center",
    paddingTop: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    locale: state.app.locale,
    name: state.auth.name,
    token: state.auth.token,
    id: state.auth.user_id
  }
};

export default connect(mapStateToProps, null)(Home);
