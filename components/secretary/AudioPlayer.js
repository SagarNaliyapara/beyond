import React, { Component, useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Modal ,Alert,StyleSheet} from "react-native";
import {Audio} from "expo-av";
import {AntDesign, Entypo, Feather, FontAwesome5} from '@expo/vector-icons';
import theme from "../../Theme";
import Slider from 'react-native-slider';

const PAUSED = 0;
const PLAYING = 1;
const PAUSED_PLAY = 2;
const STOP = 3;

const AudioPlayer = (props) => {
    let audioUri='https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3';
    // let audioUri='https://beyond-ksa.com/uploads/voice_messages/5eadd0dd32831_1588449501.amr';
    const [playState, setPlayState] = useState(PAUSED);
    const [sound, setSound] = useState(new Audio.Sound());
    const [soundDuration, setSoundDuration] = useState(null);
    const [soundPosition, setSoundPosition] = useState(null);
    const [isSeeking, setIsSeeking] = useState(false);
    const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false)
    const [shouldPlay, setShouldPlay] = useState(false)
    const updateScreenForSoundStatus = (status) => {
        //   setState(PAUSED_PLAY);
        console.log("status ==== ", status);
        if (status.didJustFinish) {
            setPlayState(PAUSED_PLAY);
        }

        if (status.isLoaded) {
            setSoundDuration(status.durationMillis);
            setSoundPosition(status.positionMillis);
            setShouldPlay(status.shouldPlay)
        } else {
            setSoundDuration(status.durationMillis);
            setSoundPosition(status.positionMillis);
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };


    const setAudioMode = async () => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        let initialPlaybackStatus = {
            isLooping: true,
            isMuted: false,
            volume: 1.0,
            rate: 1.0,
            shouldCorrectPitch: true,
        };
        let uri =audioUri;
        try {
            await sound
                .loadAsync({uri}, initialPlaybackStatus)
                .then(playbackStatus => {
                    console.log("playback status  ----> ", JSON.stringify(playbackStatus));
                    const {durationMillis} = playbackStatus;
                    setSoundDuration(durationMillis)
                }).catch((error) => {
                    console.log("error in load audio  ----> ", JSON.stringify(error));
                });
            await sound.setOnPlaybackStatusUpdate(updateScreenForSoundStatus);
        } catch (err) {
            // console.error(`Error loading audio::: ${err}`);
        }
    }
    const _getPlaybackStartTimestamp=()=> {
        if (
            sound != null &&
            soundPosition != null
        ) {
            return `${_getMMSSFromMillis(soundPosition)}`;
        }
        return '00:00';
    }

    const _getPlaybackEndTimestamp=()=> {
        if (
            sound != null &&
            soundDuration != null
        ) {
            return `${_getMMSSFromMillis(soundDuration)}`;
        }
        return '00:00';
    }

    const _getMMSSFromMillis=(millis)=> {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    const _onPlayPausePressed = () => {
        if (sound != null) {
            if (playState === PLAYING) {
                sound.pauseAsync();
            } else {
                sound.playAsync();
            }
        }
    };

    const _onStopPressed = () => {
        if (sound != null) {
            sound.stopAsync();
        }
    };

    const onPlayStopPressed = () => {
        console.log("onPlayStopPressed  ----> ",JSON.stringify(playState));
        if (sound !== null) {
            if (playState === PLAYING) {
                sound.stopAsync();
            } else {
                sound.playAsync();
            }
        }
    }

    const onPausedPress = () => {
        if (sound !== null && playState === PLAYING) {
            sound.pauseAsync();
        }
    }

    const _getSeekSliderPosition=()=> {
        if (
            sound != null &&
            soundPosition != null &&
            soundDuration != null
        ) {
            return soundPosition / soundDuration;
        }
        return 0;
    }


    const _onSeekSliderValueChange = (value) => {
        if (sound != null && !isSeeking) {
            setIsSeeking(true)
            setShouldPlayAtEndOfSeek(shouldPlay)
            sound.pauseAsync();
        }
    };

    const _onSeekSliderSlidingComplete = async (value) => {
        if (sound != null) {
            setIsSeeking(false)
            const seekPosition = value * soundDuration;
            if (shouldPlayAtEndOfSeek) {
                sound.playFromPositionAsync(seekPosition);
            } else {
                sound.setPositionAsync(seekPosition);
            }
        }
    };

    useEffect( () => {
        setAudioMode()
    },[]);

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <AntDesign name="fastbackward" size={20} color="black" style={{marginHorizontal:20}} onPress={()=>{
                    console.log("back  ----> ");
                }}/>
                <Entypo name="controller-play" size={30} color={theme.primary} style={{marginHorizontal:20}} onPress={onPlayStopPressed}/>
                <AntDesign name="fastforward" size={20} color="black" style={{marginHorizontal:20}}/>
                <FontAwesome5 name="pause" size={24} color={theme.primary} style={{marginHorizontal:20}} onPress={onPausedPress}/>
            </View>
            <Slider
                style={{alignSelf: 'stretch',}}
                trackStyle={customStyles4.track}
                thumbStyle={customStyles4.thumb}
                value={_getSeekSliderPosition()}
                onValueChange={_onSeekSliderValueChange}
                onSlidingComplete={_onSeekSliderSlidingComplete}
                thumbTintColor={theme.primary}
                thumbTouchSize={{width: 50, height: 40}}
                minimumTrackTintColor={theme.primaryDark}
            />
            <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row'}}>
                    <Text style={{color: theme.primary, fontSize: 15, textAlign: 'left', alignSelf: 'flex-end'}}>
                        {_getPlaybackStartTimestamp()}
                    </Text>
                </View>
                <Text style={{paddingHorizontal:10,color: theme.primary}}>-</Text>
                <View style={{ justifyContent: 'flex-end', flexDirection: 'row'}}>
                    <Text style={{color: theme.primary, fontSize: 15, textAlign: 'right', alignSelf: 'flex-end'}}>
                        {_getPlaybackEndTimestamp()}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default AudioPlayer;

const customStyles4 = StyleSheet.create({
    track: {
        height: 10,
        borderRadius: 4,
        backgroundColor: theme.primaryLight,
    },
    thumb: {
        width: 20,
        height: 20,
        backgroundColor:theme.primaryDark,
        borderColor: theme.primaryLight,
        borderWidth: 5,
        borderRadius: 10,
    }
});
