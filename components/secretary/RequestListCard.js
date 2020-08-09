import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import theme from "../../Theme";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { connect, useSelector, useDispatch } from "react-redux";
console.disableYellowBox = true

const RequestListCard = (props) => {
  const navigation = useNavigation();
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);
  const [soundObject, SetSoundObject] = useState(new Audio.Sound());

  useEffect(() => {
    console.log("uri  ----> ",JSON.stringify(props.uri));
    if (!isSoundLoaded) {
      soundObject.loadAsync({ uri: props.uri });
      setIsSoundLoaded(true);
    }
  });

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RequestDetails", {
        name: props.name,
        requestname: props.requestname,
        uri: props.uri,
        time: props.time,
        date: props.date
      })}
      style={[styles.container,]}
    >
      <View style={styles.leftEntry}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.subtitle}>{props.requestname}</Text>
        <TouchableOpacity
          onPress={async () => {
            // alert(soundObject)
            try {
              await soundObject.replayAsync();
            } catch (err) { }
          }}
          style={{ height: 25, width: 25, marginLeft: 10 }}
        >
          <AntDesign name="sound" size={25} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.rightEntry,]}>
        <View style={{ flexDirection: "row", alignItems: "center", }}>
          <Ionicons name="md-time" size={16} color={theme.primary} />
          <Text style={[styles.dateTimeText, { marginTop: 5 }]}>{props.time}</Text>
        </View>
        <View style={{ height: theme.large / 1.2, }} />
        <View
          style={{ flexDirection: "row", paddingTop: 2, alignItems: "center", }}
        >
          <MaterialIcons name="date-range" size={16} color={theme.primary} />
          <Text style={styles.dateTimeText}>{props.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default RequestListCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(13),
    backgroundColor: theme.transparentColor,
    marginTop: hp(2),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.primary,
    flexDirection: "row",
    marginBottom: hp(1),
  },
  leftEntry: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
    paddingLeft: 15,
  },
  rightEntry: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: theme.xl / 1.1,
    color: theme.primary,
    fontFamily: theme.pop,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: theme.large / 1.2,
    color: theme.secondary,
    fontFamily: theme.pop,
    paddingLeft: 10,
  },
  dateTimeText: {
    fontFamily: theme.pop,
    color: theme.secondary,
    fontSize: theme.medium,
    paddingLeft: 5,
    marginTop: 7
  },
});
