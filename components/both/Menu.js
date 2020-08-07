import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import Theme from "../../Theme";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TransText from "../../components/both/transtext";
import theme from "../../Theme";
import helpers from "../styles/helpers";
import { ScrollView } from "react-native-gesture-handler";
import { drawer } from "../../MainAppNavigation";
import Signin_icon from "../../assets/sidemenu_icons/signin.svg";
import Home_icon from "../../assets/sidemenu_icons/home.svg";
import Notification_icon from "../../assets/sidemenu_icons/notification.svg";
import Sec_pro_icon from "../../assets/sidemenu_icons/secretary_profile.svg";
import Chat_icon from "../../assets/sidemenu_icons/chat.svg";
import Renew_icon from "../../assets/sidemenu_icons/renew.svg";
import Change_lang_icon from "../../assets/sidemenu_icons/change_lang.svg";
import Rate_icon from "../../assets/sidemenu_icons/rate.svg";
import Actions from "../../actions/creator";
import * as NavigationService from "../../services/navigationService";
import HeaderSmall from "../../components/both/HeaderSmall";
// import NavigationService from './NavigationService';
const sampleimg = "https://randomuser.me/api/portraits/men/29.jpg";
class Menu extends Component {
  render() {
    const { locale, name, token } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: helpers.size(20) }}
          contentContainerStyle={locale == "ar" && { alignItems: "flex-end" }}
        >
          <View
            style={[
              {
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                marginBottom: helpers.size(30),
                marginTop: Platform.OS === "android" ? 50 : 75,
              },
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
          >
            <Image source={{ uri: sampleimg }} style={styles.img} />
            <View
              style={{
                paddingLeft: wp(3),
                paddingRight: wp(3),
                justifyContent: "center",
              }}
            >
              <Text
                style={[styles.title, locale == "ar" && { textAlign: "right" }]}
              >
                {name}
              </Text>
              <TransText
                style={[
                  styles.subtitle,
                  locale == "ar" && { textAlign: "right" },
                ]}
                transkey="EDIT_PROFILE"
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.menuItem,
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
            onPress={() => {
              drawer.current.close();
              if (token) {
                this.props.dispatch(Actions.signout());
              } else {
                NavigationService.navigate("SignIn");
              }
            }}
          >
            {/* <Image width={helpers.size(20)} height={helpers.size(20)} source={signin_icon} /> */}
            <Signin_icon width={helpers.size(20)} height={helpers.size(20)} />
            <TransText
              style={styles.menuItemText}
              transkey={token ? "MENU_SIGNOUT" : "MENU_SIGNIN"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.menuItem,
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
            onPress={() => {
              drawer.current.close();
              NavigationService.navigate("Home");
            }}
          >
            <Home_icon width={helpers.size(20)} height={helpers.size(20)} />
            <TransText style={styles.menuItemText} transkey="MENU_HOME" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.menuItem,
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
            onPress={() => {
              drawer.current.close();
              NavigationService.navigate('NotificationTab')
            }}
          >
            <Notification_icon
              width={helpers.size(20)}
              height={helpers.size(20)}
            />
            <TransText
              style={styles.menuItemText}
              transkey="MENU_NOTIFICATION"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.menuItem,
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
            onPress={() => {
              drawer.current.close();
              NavigationService.navigate('SecretaryProfile')
            }}
          >
            <Sec_pro_icon width={helpers.size(20)} height={helpers.size(20)} />
            <TransText style={styles.menuItemText} transkey="MENU_SEC_PRO" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.menuItem,
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
            onPress={() => {
              NavigationService.navigate('ChatTab')
              drawer.current.close();
            }}
          >
            <Chat_icon width={helpers.size(20)} height={helpers.size(20)} />
            <TransText style={styles.menuItemText} transkey="MENU_CHAT" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.menuItem,
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
            onPress={() => {
              NavigationService.navigate("Subscribe");
              drawer.current.close();
            }}
          >
            <Renew_icon width={helpers.size(20)} height={helpers.size(20)} />
            <TransText style={styles.menuItemText} transkey="MENU_RENEW" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.menuItem,
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
            onPress={() => {
              drawer.current.close();
            }}
          >
            <Change_lang_icon
              width={helpers.size(20)}
              height={helpers.size(20)}
            />
            <TransText
              style={styles.menuItemText}
              transkey="MENU_CHANGE_LANG"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.menuItem,
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
            onPress={() => {
              drawer.current.close();
            }}
          >
            <Rate_icon width={helpers.size(20)} height={helpers.size(20)} />
            <TransText style={styles.menuItemText} transkey="MENU_RATE" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.menuItem,
              {
                borderBottomWidth: 0,
                marginTop: helpers.size(50),
                paddingBottom: 5,
              },
              locale == "ar" && { flexDirection: "row-reverse" },
            ]}
            onPress={() => {
              drawer.current.close();
            }}
          >
            <TransText style={styles.menuItemText} transkey="MENU_CONTACT_US" />
          </TouchableOpacity>
          <TransText style={styles.powText} transkey="MENU_POW_BY" />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  locale: state.app.locale,
  name: state.auth.name,
  token: state.auth.token,
});

export default connect(mapStateToProps, null)(Menu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primary,
  },
  img: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  title: {
    fontSize: helpers.size(20),
    color: theme.titleColor,
    fontFamily: theme.popbold,
  },
  subtitle: {
    fontSize: helpers.size(12),
    color: theme.titleColor,
    fontFamily: theme.popbold,
  },
  menuItem: {
    width: wp(50),
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: "white",
    borderColor: "white",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemIcon: {
    // height: helpers.size(20),
    // fontSize: helpers.size(20),
    width: helpers.size(100),
    resizeMode: "contain",
  },
  menuItemText: {
    fontFamily: theme.popbold,
    color: "white",
    fontSize: helpers.size(16),
    paddingHorizontal: 10,
  },
  powText: {
    color: "white",
    paddingHorizontal: 10,
    fontSize: helpers.size(13),
    marginBottom: 20,
  },
});
