import React, { Component, useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Modal ,Alert} from "react-native";
import theme from "../../Theme";

import { AntDesign } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { State } from "react-native-gesture-handler";
import { Audio } from "expo-av";
import Toast from "react-native-whc-toast";
import { prop } from "ramda";

const PAUSED_RECORDING = 0;
const RECORDING = 1;
const PLAYING = 2;
const PAUSED_PLAY = 3;

export default renderModal = (props) => {
  const recordingSettings = JSON.parse(
    JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
  );
  const [state, setState] = useState(0);
  const [sound, setSound] = useState(null);
  const [audioRecorder, setAudioRecorder] = useState(new Audio.Recording());
  const [recordingDuration, setRecordingDuration] = useState(0.0);
  const [soundDuration, setSoundDuration] = useState(null);
  const [soundPosition, setSoundPosition] = useState(null);
  const [renderWaveImage, SetRenderWaveImage] = useState(true);

  const getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  };

  const getRecordingTimestamp = () => {
    if (recordingDuration != null) {
      return `${getMMSSFromMillis(recordingDuration)}`;
    }
    return `${getMMSSFromMillis(0)}`;
  };

  const updateScreenForRecordingStatus = (status) => {
    if (status.canRecord) {
      setRecordingDuration(status.durationMillis);
    } else if (status.isDoneRecording) {
      setRecordingDuration(status.durationMillis);
    }
  };

  const getPlaybackTimestamp = () => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return `${getMMSSFromMillis(soundPosition)}`;
    }
    return "";
  };

  const getPlaybackEndTimestamp = () => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return `${getMMSSFromMillis(soundDuration)}`;
    }
    return "";
  };

  updateScreenForSoundStatus = (status) => {
    //   setState(PAUSED_PLAY);
    console.log("status ==== ", status);
    if (status.didJustFinish) {
      setState(PAUSED_PLAY);
      SetRenderWaveImage(false);
      SetRenderWaveImage(true);
    }

    if (status.isLoaded) {
      setSoundDuration(status.durationMillis);
      setSoundPosition(status.positionMillis);
    } else {
      setSoundDuration(status.durationMillis);
      setSoundPosition(status.positionMillis);
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const renderWave = () => {
    // if ((state == RECORDING || state == PLAYING) && renderWaveImage) {
    //   return (
    //     <View
    //       style={{
    //         height: 80,
    //         width: "80%",
    //         backgroundColor: "transparent",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Image
    //         resizeMode="stretch"
    //         source={require("../../assets/wave.gif")}
    //         style={{ height: 150, width: "80%" }}
    //       />
    //     </View>
    //   );
    // } else if (renderWaveImage) {
      return (
        <View
          style={{
            height: 80,
            width: "80%",
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            resizeMode="stretch"
            source={require("../../assets/wave1.png")}
            style={{ height: 150, width: "80%" }}
          />
        </View>
      );
    // } else {
    //   return null;
    // }
  };

  const renderRecordButton = () => {
    let icon = <MaterialIcons name="settings-voice" size={24} color="white" />;

    if (state == RECORDING) {
      icon = <MaterialIcons name="stop" size={24} color="white" />;
    } else if (state == PAUSED_PLAY) {
      icon = (
        <MaterialCommunityIcons
          style={{ marginLeft: 5 }}
          name="play-outline"
          size={40}
          color="white"
        />
      );
    } else if (state == PLAYING) {
      icon = <MaterialIcons name="stop" size={24} color="white" />;
    }

    return (
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          borderRadius: 25,
          backgroundColor:
            state == RECORDING || state == PAUSED_RECORDING
              ? "red"
              : theme.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={async () => {
          console.log("onPress =========== ");

          if (state == PAUSED_RECORDING) {
            console.log("start =========== 1");

            await audioRecorder.prepareToRecordAsync(recordingSettings);
            audioRecorder.setOnRecordingStatusUpdate(
              updateScreenForRecordingStatus
            );
            await audioRecorder.startAsync(); //
            setState(RECORDING);
          } else if (state == RECORDING) {
            console.log("info =========== 1");
            await audioRecorder.stopAndUnloadAsync(); //
            console.log("info =========== 2");
            const info = await FileSystem.getInfoAsync(audioRecorder.getURI());

            const {
              sound,
              status,
            } = await audioRecorder.createNewLoadedSoundAsync(
              {
                isLooping: false,
              },
              updateScreenForSoundStatus
            );

            setSound(sound);
            setState(PAUSED_PLAY);
            // setTimeout(() => {
            SetRenderWaveImage(false);
            SetRenderWaveImage(true);
            // }, 500);
          } else if (state == PAUSED_PLAY) {
            if (sound != null) {
              sound.setVolumeAsync(1.0);
              await sound.replayAsync();
            }
            setState(PLAYING);
          } else if (state == PLAYING) {
            await sound.stopAsync();
            setState(PAUSED_PLAY);
            // setTimeout(() => {
            SetRenderWaveImage(false);
            SetRenderWaveImage(true);
            // }, 500);
          }
        }}
      >
        {icon}
      </TouchableOpacity>
    );
  };

  if (!props.showModal) {
    return null;
  }

  let toastRef = null;

  return (
    <Modal transparent={true}>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: 0.7,
          position: "absolute",
        }}
      />
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          //   backgroundColor: "green",
        }}
      >
        <View
          style={{
            width: "80%",
            height: "65%",
            justifyContent: "space-between",
            backgroundColor: "white",
            alignItems: "center",
            alignSelf: "center",
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              //   backgroundColor: "red",
              alignSelf: "flex-end",
              justifyContent: "space-between",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              right: 0,
              top: 0,
            }}
            onPress={() => {
              props.setShowModal(false);
            }}
          >
            <AntDesign name="close" size={24} color={theme.primary} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 20, color: "#CEB07C", fontWeight: "bold" }}
            >
              ORDER HERE
            </Text>
          </View>
          {/* <View style={{ alignItems: "center" }}> */}
          <Text style={{ fontSize: 40, color: "black" }}>
            {getRecordingTimestamp()}
          </Text>

          {renderWave()}

          {state != RECORDING && state != PAUSED_RECORDING ? (
            <View style={{ width: "80%" }}>
              <View
                style={{ backgroundColor: "#e5e5e5", width: "100%", height: 2 }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 15, color: theme.primary }}>
                  {getPlaybackTimestamp()}
                </Text>
                <Text style={{ fontSize: 15, color: theme.primary }}>
                  {getPlaybackEndTimestamp()}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {renderRecordButton()}
            </View>

            {state != RECORDING || state != PAUSED_RECORDING ? (
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  width: 40,
                  height: 40,
                  backgroundColor: "black",
                  position: "absolute",
                  right: "15%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={async () => {
                  if (audioRecorder !== null) {
                    try {
                      await audioRecorder.stopAndUnloadAsync(); //
                    } catch (err) {}
                    audioRecorder.setOnRecordingStatusUpdate(null);
                  }
                  try {
                    await sound.unloadAsync();
                  } catch (error) {}

                  setSound(null);

                  setAudioRecorder(new Audio.Recording());
                  setState(PAUSED_RECORDING);
                  setRecordingDuration(0);
                  //   setTimeout(() => {
                  SetRenderWaveImage(false);
                  SetRenderWaveImage(true);
                  //   }, 500);
                }}
              >
                <AntDesign name="delete" size={20} color="white" />
              </TouchableOpacity>
            ) : null}
          </View>
          {/* </View> */}

          <TouchableOpacity
            style={{
              height: 40,
              width: "80%",
              marginTop: 20,
              backgroundColor: "#CEB07C",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              alignSelf: "center",
            }}
            onPress={async () => {
              if (!audioRecorder.getURI()) {
                alert("Please record a audio");
                return;
              }

              const info = await FileSystem.getInfoAsync(
                audioRecorder.getURI()
              );

              const uriParts = info.uri.split(".");
              const fileType = uriParts[uriParts.length - 1];

              const data = new FormData();
              data.append("voice", {
                uri:info.uri,
                name: `audio.${fileType}`,
                type: `image/${fileType}`,
              });

              const options = {
                method: 'POST',
                body: data,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                  Authorization: "Bearer " + props.token
                },
              };

              toastRef.showBottom("Sending...", Toast.Duration.infinite);
               fetch("https://beyond-ksa.com/api/send-voice-message", options)
               .then(red=>red.json())
               .then(res=>{
               
                 console.log("res =====", res)
                 toastRef.close();
                 if (res.success) {
                   alert(res.success);
                 }

               })

              }} >
            <Text style={{ fontSize: 15, color: "white" }}>DONE</Text>
          </TouchableOpacity>
          <Toast
            ref={(ref) => {
              toastRef = ref;
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
