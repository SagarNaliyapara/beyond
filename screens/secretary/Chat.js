import React, { Component, useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  LayoutAnimation,
} from "react-native";
import EmojiSelector from 'react-native-emoji-selector'
const {width, height} = Dimensions.get("screen")
import theme from "../../Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FooterSecretary from "../../components/secretary/FooterSecretary";
import HeaderLongSecretary from "../../components/secretary/HeaderLongSecretary";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Content } from "native-base";
import RecordingModal from "../../components/both/AudioRecordingModal";
import * as Permissions from "expo-permissions";
import Actions from "../../actions/creator";
import HeaderSmall from '../../components/both/HeaderSmall'
import { Keyboard, KeyboardEvent } from 'react-native';

const chatImage = "https://randomuser.me/api/portraits/men/29.jpg";
const NoSecretatyMessage = "Wait for admin to assign secretary to you";
const NoSubscriptiobnMessage = "You have not subscribed any plan";

// const messages = [
//   {
//     message:
//       "hello how are youdfsdfg sdgfj sdgfjhgdsjfh dsjhfjdshfjhdsjfhds kjhfkd shfdhsf",
//     time: "02:59",
//     received: true,
//   },
//   {
//     message: "hello",
//     time: "02:59",
//     received: false,
//   },
//   {
//     message: "What are you doing",
//     time: "03:09",
//     received: true,
//   },
//   {
//     message: "What are you doing",
//     time: "03:09",
//     received: true,
//   },
// ];

const messageBox = (message, user_id) => {
  const received = message.sender_id != user_id;
  return (
    <View
      style={{
        flexDirection: "row",

        marginTop: 20,
        width: "70%",
        minHeight: 50,
        alignSelf: received ? "flex-start" : "flex-end",
      }}
    >
      {received ? (
        <View style={{ marginRight: 10, justifyContent: "flex-end" }}>
          <Image source={{ uri: chatImage }} style={styles.chatimg} />
        </View>
      ) : null}
      <View
        style={{
          width: "100%",
          borderRadius: 10,
          padding: 10,
          borderBottomLeftRadius: received ? 0 : 10,
          borderBottomRightRadius: received ? 10 : 0,
          backgroundColor: received ? theme.transparentColor : theme.primary,
        }}
      >
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            fontFamily: theme.pop,
            lineHeight: 20,
          }}
        >
          {message.message}
        </Text>
        <View
          style={{
            alignSelf: received ? "flex-start" : "flex-end",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 10 }}>{message.created_at}</Text>
        </View>
      </View>
    </View>
  );
};

const Profile = (props) => {
  const navigation = useNavigation();
  const authRed = useSelector((state) => state.auth);
  const appRed = useSelector((state) => state.app);
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const [keyBoardheight, setKeyBoardheight] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.getMessagesAttempt(authRed.user_id));
    Keyboard.addListener("keyboardDidShow", (e) => {
     setKeyBoardheight(e.endCoordinates.height - height * 0.07)
     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
    Keyboard.addListener("keyboardDidHide", (e) => {
      setKeyBoardheight(0)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });

    // Remove event listener on cleanup
    return () => {
      Keyboard.removeAllListeners;
    };
  }, [appRed.messages.length]);

  const sampleimg = "https://randomuser.me/api/portraits/men/29.jpg";
  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <View style={styles.header}>
        {/* this is the header component with 2 icons */}
        <HeaderSmall leftIcon="menu" rightIcon="settings" />
      </View>
      <View style={styles.body}>
        {/* <Image style={{position:'absolute', flex:1}} resizeMode="cover" source={require("../../assets/bgTransparentLogo.png")} ></Image> */}
        <View>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: hp(2),
            }}
          >
            <Image source={{ uri: sampleimg }} style={styles.img} />
            <View>
              <Text style={styles.name}>{authRed.name}</Text>
              <Text style={styles.name2}>CEO OF LIPSUM</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "90%",
            height: 1,
            backgroundColor: "#e5e5e5",
            alignSelf: "center",
          }}
        />
        {authRed.secretary_id !== "" ? (
          <View style={{ flex: 1 }}>
            <FlatList
              inverted
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={appRed.messages}
              renderItem={({ item }) => {
                return messageBox(item, authRed.user_id);
              }}
            />
            {/* flat list */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                borderColor: "#e5e5e5",
                borderWidth: 1,
                marginTop: 5,
                // backgroundColor:"red",
                paddingHorizontal: 20,
                paddingVertical: 5,
                alignItems: "center",
                marginBottom: keyBoardheight,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowEmoji(false);
                  if (text == "") {
                    return;
                  }
                  dispatch(
                    Actions.sendMessagesAttempt(
                      authRed.secretary_id,
                      authRed.user_id,
                      text
                    )
                  );
                  setText("");
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: "#CEB07C",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="arrowright" size={20} color="white" />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 20,
                  height: 40,
                  borderColor: "#e5e5e5",
                  borderWidth: 1,
                  borderRadius: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  width:'100%',
                }}
              >
                <TextInput
                    style={{
                      width:'90%',
                      paddingVertical:5,
                    }}
                  onBlur={() => {
                    setFocus(false);
                  }}
                  onFocus={() => {
                    setFocus(true);
                  }}
                  value={text}
                  placeholder="Type a message..."
                  onChangeText={(text) => {
                    setText(text);
                  }}
                />
                <TouchableOpacity
                    onPress={() => setShowEmoji(!showEmoji)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 25,
                      backgroundColor: "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                >
                  <SimpleLineIcons
                      name="emotsmile"
                      size={20}
                      color={theme.primary}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                  onPress={() => {
                    dispatch(
                        Actions.sendMessagesAttempt(
                            authRed.secretary_id,
                            authRed.user_id,
                            '👍'
                        )
                    );
                  }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  // backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="thumb-up"
                  size={24}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={{ alignSelf: "center", marginTop: 100 }}>
            {authRed.subscription == null
              ? NoSubscriptiobnMessage
              : NoSecretatyMessage}
          </Text>
        )}
        {showEmoji && <EmojiSelector onEmojiSelected={(emoji) => {
          setText(text + emoji);
        }}/>}
      </View>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 24 : 0,
  },
  header: {
    flex: 1,
    backgroundColor: theme.primary,
  },
  body: {
    flex: 7.5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    // paddingHorizontal: 40,
    paddingTop: 25,
  },
  footer: {
    flex: 0.8,
  },

  img: {
    borderRadius: 50,
    width: 75,
    height: 75,
  },

  chatimg: {
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  name: {
    // fontFamily: theme.popbold,
    fontSize: theme.xl,
    color: "black",
    fontWeight: "bold",
    paddingLeft: wp(5),
  },
  name2: {
    // fontFamily: theme.popbold,
    fontSize: theme.xsmall,
    color: "black",
    fontWeight: "bold",
    paddingLeft: wp(5),
  },

  title: {
    fontFamily: theme.pop,
    fontSize: theme.medium,
    color: theme.secondary,
    paddingLeft: wp(5),
  },
  placeholder: {
    fontFamily: theme.pop,
    fontSize: theme.medium,
    paddingLeft: 10,
  },
  menuContainer: {
    height: hp(18),
    backgroundColor: theme.transparentColor,
    width: wp(38),
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  menuTitle: {
    fontSize: theme.medium,
    color: theme.primary,
    fontFamily: theme.popbold,
    paddingTop: 10,
  },
  valueText: {
    fontSize: theme.small,
    color: theme.primary,
    fontFamily: theme.pop,
  },
});
