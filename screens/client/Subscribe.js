import React, { Component, useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import theme from "../../Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Actions from "../../actions/creator";
import Footer from "../../components/both/Footer";
import HeaderSmall from "../../components/both/HeaderSmall";
import { WebView } from "react-native-webview";
import ContactCard from "../../components/client/ContactCard";
import { AntDesign } from "@expo/vector-icons";
//react native swiper, please check docs for more info
import Swiper from "react-native-swiper";
import SwiperFlatList from "react-native-swiper-flatlist";
const { width, height } = Dimensions.get("window");
import lang from "../../config/lang";
import { HeaderBackButton } from "@react-navigation/stack";
const { locales, getText } = lang;

//replace with your json
const DATA = [
  {
    id: "1",
    title: "First Item",
  },
  {
    id: "2",
    title: "Second Item",
  },
  {
    id: "3",
    title: "Third Item",
  },
  {
    id: "4",
    title: "First Item",
  },
  {
    id: "5",
    title: "Second Item",
  },
  {
    id: "6",
    title: "Third Item",
  },
  {
    id: "7",
    title: "First Item",
  },
  {
    id: "8",
    title: "Second Item",
  },
  {
    id: "9",
    title: "Third Item",
  },
];


const makePayment = (userid, package_id, transaction_id, amount) => {
  let formdata = new FormData()
  formdata.append("user_id", userid)
  formdata.append("package_id", package_id)
  formdata.append("transaction_id", transaction_id)
  formdata.append("amount", amount)

  fetch('https://beyond-pa.com/api/make_payment', {
    method: 'post',
    headers: {
      Accept: "application/json",
      'Content-Type': 'multipart/form-data',
    },
    body: formdata
  }).then(response => {
    // console.log("payment done", response)
    // alert(JSON.stringify(response))

  }).catch(err => {
    console.log(err)
  })
}


const Subscribe = (props) => {
  const [shoPaymentWebView, setShoPaymentWebView] = useState(false);

  const appRed = useSelector((state) => state.app);
  const authRed = useSelector((state) => state.auth);
  const [selectedPkg, onChnageSelectedPkg] = useState('');
  const [selectedUser, onChnageSelectedUser] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.getPackagePlansAttempt());
  }, [appRed.package_plans.length]);

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={appRed.shoPaymentWebView == false ? styles.container : styles.container1}
    >
      <View style={styles.header}>

        <HeaderSmall leftIcon="menu" rightIcon="settings" />
      </View>
      <View
        style={[
          styles.titleSpace,
          { flexDirection: appRed.locale == "en" ? "row" : "row-reverse" },
        ]}
      >

        <Text style={styles.title}>{getText("SUBSCRIBE", appRed.locale)}</Text>
      </View>
      {appRed.shoPaymentWebView == true ? <View style={{ height: "100%", width: "100%" }}>
        <TouchableOpacity onPress={() => { dispatch(Actions.showPaymentWebView(false)) }}
          style={{ height: 30, width: 30, borderRadius: 15, alignSelf: "flex-end", justifyContent: "center" }}>
          <AntDesign name="close" size={24} color={"black"} />
        </TouchableOpacity>
        <WebView
          onNavigationStateChange={(state) => {
            console.log("st", state.url)
            if (state.url == "https://beyond-pa.com/success") {
              dispatch(Actions.showPaymentWebView(false))
              alert('Payment Successfully Recived ')
            } else if (state.url == "https://beyond-pa.com/error") {
              dispatch(Actions.showPaymentWebView(false))
              alert('Payment Fail ')
            }
          }}
          source={{ uri: "https://beyond-ksa.com/paytab_payment?package_id=" + selectedPkg + "&" + "user_id=" + selectedUser }}
        >
        </WebView>
      </View> :

        <View style={styles.body}>

          <SwiperFlatList showPagination paginationActiveColor={theme.primary}>
            {appRed.package_plans.map((pkg, index) => {
              return (
                <View key={index + ""} style={styles.slide1}>
                  {/* PLAN TITLE  */}
                  <TouchableOpacity style={styles.mainContainer}>
                    <Text style={styles.planTitle}>BEYOND PLUS</Text>
                    <View
                      style={{
                        flexDirection:
                          appRed.locale == "en" ? "row" : "row-reverse",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.planCost}>
                        {appRed.locale == "en" ? pkg.name_en : pkg.name_ar}
                      </Text>
                      <Text style={styles.planDuration}>/</Text>
                      <Text style={styles.planDuration}>{pkg.duration}</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={{ height: hp(40) }}>
                    <FlatList
                      data={
                        appRed.locale == "en"
                          ? pkg.features.english
                          : pkg.features.arabic
                      }
                      renderItem={({ item }) => (
                        <View
                          style={{
                            flexDirection:
                              appRed.locale == "en" ? "row" : "row-reverse",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={require("../../assets/tick.png")}
                            style={{ width: 15, height: 15 }}
                          />
                          <Text style={styles.featureText}>{item}</Text>
                        </View>
                      )}
                      keyExtractor={(item) => item.id}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.mainBtn}
                    onPress={() => {
                      onChnageSelectedPkg(pkg.id)
                      onChnageSelectedUser(authRed.user_id)
                      makePayment(authRed.user_id, pkg.id, "", 20)
                      dispatch(Actions.showPaymentWebView(true))
                      // dispatch(Actions.getSavePlansAttempt(pkg.id,authRed.user_id,"coupen_id" ))
                    }}
                  >
                    <Text style={styles.btnText}>
                      {getText("SUBSCRIBE", appRed.locale)}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </SwiperFlatList>
        </View>
      }


    </ImageBackground>

  );
};
export default Subscribe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 24 : 0,

  },
  container1: {
    flex: 1,


  },
  header: {
    flex: 1,
  },
  titleSpace: {
    flex: 1,
    // justifyContent: "center",
    paddingHorizontal: wp(6),
  },
  body: {
    flex: 8,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
    // paddingHorizontal: 25,
  },
  footer: {
    flex: 1,
  },
  title: {
    fontSize: theme.xxl / 1.2,
    color: theme.titleColor,
    fontFamily: theme.pop,
  },
  slide1: {
    flex: 1,
    width,
    paddingHorizontal: 25,
    paddingTop: hp(2),

  },
  slide2: {
    flex: 1,
    paddingTop: hp(2),
  },
  slide3: {
    flex: 1,
    paddingTop: hp(2),
  },
  mainContainer: {
    width: "100%",
    height: hp(14),
    borderRadius: 10,
    marginTop: hp(1),
  },
  planTitle: {
    color: theme.secondary,
    fontFamily: theme.pop,
    fontSize: theme.xxl,
    paddingLeft: wp(2),
  },
  planCost: {
    color: theme.primary,
    fontFamily: theme.pop,
    fontSize: theme.xxl / 1.3,
    paddingLeft: wp(2),
  },
  planDuration: {
    color: theme.secondary,
    fontFamily: theme.pop,
    fontSize: theme.medium,
    paddingLeft: wp(2),
  },
  featureText: {
    color: theme.secondary,
    fontFamily: theme.pop,
    fontSize: theme.medium,
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
  },
  mainBtn: {
    width: "100%",
    backgroundColor: theme.primary,
    justifyContent: "center",
    alignItems: "center",
    height: hp(7),
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontFamily: theme.pop,
    fontSize: theme.medium,
  },
});
